"use client";

import { useCallback, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { AccountStatus, NftItem } from "@ton-api/client";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Address, beginCell, fromNano, toNano } from "@ton/ton";
import { useWalletContext } from "@/contexts/wallet-context";
import { storeNFTTransfer } from "@/lib/NftItem";
import { NftItemTemplate } from "@/lib/NftItem";
import { randomInt } from "@/lib/utils";
import { JettonWallet, storeJettonTransfer } from "@/lib/JettonWallet";

interface NewTokenMigrationProps {
  userNfts_old: NftItem[] | null;
  balanceORBC_old: bigint | null;
  unclaimedReward_old: bigint;
  eligibleNfts_old: NftItem[];
  collectRewards: (
    eligibleNfts: NftItem[],
    setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void,
    setCollectRewardsError: (collectRewardsError: string | null) => void
  ) => void;
  firstFourEligibleAmount: bigint;
}

interface CollectRewardsStepProps {
  unclaimedReward_old: bigint;
  firstFourEligibleAmount: bigint;
  collectRewards: () => void;
  error: string | null;
}

function CollectRewardsStep({
  unclaimedReward_old,
  firstFourEligibleAmount,
  collectRewards,
  error,
}: CollectRewardsStepProps) {
  const { t } = useLanguage();

  return (
    <div>
      <Button
        onClick={() => collectRewards()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.collectRewards")}
        {unclaimedReward_old > 0n &&
          ` (${parseFloat(fromNano(firstFourEligibleAmount.toString())).toFixed(2)} / ${parseFloat(fromNano(unclaimedReward_old.toString())).toFixed(2)} ORBC)`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step1")}</p>
    </div>
  );
}

function MigrateNftsStep({
  countNfts,
  migrateNfts,
  error,
}: {
  countNfts: number;
  migrateNfts: () => void;
  error: string | null;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <Button
        onClick={() => migrateNfts()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.migrateNFTs")}
        {` (${countNfts})`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step2")}</p>
    </div>
  );
}

function MigrateTokensStep({
  balanceORBC,
  migrateTokens,
  error,
}: {
  balanceORBC: bigint;
  migrateTokens: () => void;
  error: string | null;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <Button
        onClick={() => migrateTokens()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.migrateTokens")}
        {` (${fromNano(balanceORBC)})`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step3")}</p>
    </div>
  );
}

export function NewTokenMigration({
  userNfts_old,
  balanceORBC_old,
  unclaimedReward_old,
  eligibleNfts_old,
  collectRewards,
  firstFourEligibleAmount,
}: NewTokenMigrationProps) {
  const { t } = useLanguage();
  const [isTxPending, setIsTxPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const step =
    unclaimedReward_old > 0n
      ? "rewards"
      : userNfts_old !== null && userNfts_old.length > 0
      ? "nfts"
      : "tokens";

  const {
    tonClient,
    tonApi,
    sender,
    walletAddress,
    tonConnectUI,
    exchangerAddress,
    jettonMasterAddress,
    jettonMasterAddress_old,
    nftCollectionAddress_old
  } = useWalletContext();
  const migrateNFTs = useCallback(async () => {
    if (
      !tonClient ||
      !sender ||
      !walletAddress ||
      !tonApi ||
      !tonConnectUI ||
      !userNfts_old ||
      !exchangerAddress ||
      !nftCollectionAddress_old
    )
      return;
    setIsTxPending(true);

    const minAttach = toNano("0.12");
    // Limit to 4 NFTs or less
    const nftsToProcess = userNfts_old.slice(0, 4);
    const nftsCount = nftsToProcess.length;

    try {
      // Check TON balance
      const balance_ = (
        await tonApi.accounts.getAccount(Address.parse(walletAddress))
      ).balance;

      if (!balance_ || balance_ < minAttach * BigInt(nftsCount)) {
        console.log(balance_);
        setIsTxPending(false);
        setError(
          `Not enough TON balance (need at least ${fromNano(
            minAttach * BigInt(nftsCount)
          )} TON)`
        );
        return;
      }

      const messages: { address: string; amount: string; payload: string }[] =
        [];
      for (const nft of nftsToProcess) {
        const nftItem = await tonClient.open(
          NftItemTemplate.fromAddress(nft.address)
        );
        const index = (await nftItem.getGetNftData()).index;
        messages.push({
          address: nft.address.toString(),
          amount: minAttach.toString(),
          payload: beginCell()
            .store(
              storeNFTTransfer({
                $$type: "NFTTransfer",
                queryId: randomInt(),
                newOwner: exchangerAddress,
                responseDestination: Address.parse(walletAddress),
                customPayload: null,
                forwardAmount: toNano("0.11"),
                forwardPayload: beginCell().storeUint(index, 256).endCell(),
              })
            )
            .endCell()
            .toBoc()
            .toString("base64"),
        });
      }
      await tonConnectUI.sendTransaction({
        messages: messages,
        validUntil: Date.now() + 3 * 60 * 1000,
      });

      // Start polling for transaction completion
      const timeoutDuration = 300000; // 5 minutes timeout
      const startTime = Date.now();
      const newNfts = (
        await tonApi.accounts.getAccountNftItems(Address.parse(walletAddress))
      ).nftItems.filter((nft) =>
        nft.collection!.address.equals(nftCollectionAddress_old)
      );
      const checkTransaction = async () => {
        if (Date.now() - startTime > timeoutDuration) {
          throw new Error("Transaction timeout");
        }
        console.log("Checking nft migration transaction...");
        const newNfts_upd = (
          await tonApi.accounts.getAccountNftItems(Address.parse(walletAddress))
        ).nftItems.filter((nft) =>
          nft.collection!.address.equals(nftCollectionAddress_old)
        );
        if (newNfts_upd.length > newNfts.length) {
          return true;
        }
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return checkTransaction();
      };
      await checkTransaction();
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setIsTxPending(false);
    }
  }, [
    userNfts_old,
    setIsTxPending,
    tonClient,
    tonApi,
    sender,
    tonConnectUI,
    walletAddress,
  ]);

  const migrateTokens = useCallback(async () => {
    if (!tonClient || !sender || !walletAddress || !tonApi || !tonConnectUI || !exchangerAddress || !jettonMasterAddress || !jettonMasterAddress_old || !balanceORBC_old) return;
    setIsTxPending(true);
    const minAttach = toNano("0.1");

    try {
      const balance_ = (
        await tonApi.accounts.getAccount(Address.parse(walletAddress))
      ).balance;

      if (!balance_ || balance_ < minAttach) {
        console.log(balance_);
        setIsTxPending(false);
        setError(
          `Not enough TON balance (need at least ${fromNano(
            minAttach
          )} TON)`
        );
        return;
      }

      const jettonWalletAddress = Address.parse(
        (
          await tonApi.blockchain.execGetMethodForBlockchainAccount(
            jettonMasterAddress_old,
            "get_wallet_address",
            { args: [walletAddress] }
          )
        ).decoded.jetton_wallet_address
      );

      const jettonWallet = tonClient.open(
        JettonWallet.fromAddress(jettonWalletAddress)
      );

      await jettonWallet.send(
        sender,
        {
          value: minAttach,
          bounce: true,
        },
        {
          $$type: "JettonTransfer",
          queryId: randomInt(),
          amount: balanceORBC_old,
          destination: exchangerAddress,
          responseDestination: Address.parse(walletAddress),
          customPayload: null,
          forwardTonAmount: toNano("0.06"),
          forwardPayload: beginCell().storeUint(0, 1).endCell().asSlice(),
        }
      );

      const timeoutDuration = 150000; // 1 minute timeout
      const startTime = Date.now();

      let orbcBalance = 0n;
      try {
        orbcBalance = (await tonApi.accounts.getAccountJettonBalance(Address.parse(walletAddress), jettonMasterAddress)).balance;
      } catch (error) {
        console.error(error);
      }
      const checkTransaction = async () => {
        if (Date.now() - startTime > timeoutDuration) {
          throw new Error("Transaction timeout");
        }

        try {
          const balanceNew = (await tonApi.accounts.getAccountJettonBalance(Address.parse(walletAddress), jettonMasterAddress)).balance;
          if (balanceNew > orbcBalance) {
            return true;
          }
        } catch (error) {
          console.error(error);
        }
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return checkTransaction();
      };
      await checkTransaction();
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setIsTxPending(false);
    }
  }, [tonClient, sender, walletAddress, tonApi, tonConnectUI, exchangerAddress, jettonMasterAddress, jettonMasterAddress_old, balanceORBC_old]);

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <Card className="border-blue-400">
          <CardHeader className="flex flex-row items-start gap-4">
            <InfoIcon className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <CardTitle className="text-xl">{t("migration.title")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {t("migration.description")}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Old ORBC Balance:
                </span>
                <span className="font-medium">
                  {balanceORBC_old !== null
                    ? fromNano(balanceORBC_old.toString())
                    : "loading..."}{" "}
                  ORBC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  NFTs on Old Network:
                </span>
                <span className="font-medium">
                  {userNfts_old !== null ? userNfts_old.length : "loading..."}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Unclaimed Rewards:
                </span>
                <span className="font-medium">
                  {fromNano(unclaimedReward_old.toString())} ORBC
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center space-y-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
        {isTxPending && (
          <div className="flex flex-col items-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600 mb-2"></div>
            <p>{"Processing transaction..."}</p>
          </div>
        )}
        {step === "rewards" && !isTxPending && (
          <CollectRewardsStep
            unclaimedReward_old={unclaimedReward_old}
            firstFourEligibleAmount={firstFourEligibleAmount}
            collectRewards={() => {
              collectRewards(eligibleNfts_old, setIsTxPending, setError);
            }}
            error={error}
          />
        )}
        {step === "nfts" && userNfts_old !== null && !isTxPending && (
          <MigrateNftsStep
            countNfts={userNfts_old.length}
            error={error}
            migrateNfts={migrateNFTs}
          />
        )}
        {step === "tokens" && balanceORBC_old !== null && !isTxPending && (
          <MigrateTokensStep
            balanceORBC={balanceORBC_old}
            error={error}
            migrateTokens={migrateTokens}
          />
        )}
      </div>
    </div>
  );
}
