import { useCallback } from "react";
import { Address, TonClient, toNano, type Sender } from "@ton/ton";
import { TonApiClient, AccountStatus, NftItem } from "@ton-api/client";
import { beginCell, fromNano } from "@ton/core";
import { NftItemTemplate, storeNFTTransfer } from "@/lib/NftItem";
import { randomInt } from "@/lib/utils";
import { useWalletContext } from "../contexts/wallet-context";
import { OMGiver } from "@/lib/OMGiver";

export function useCollectRewards(old: boolean) {
  const {
    walletAddress,
    tonClient,
    tonApi,
    sender,
    omGiverAddress,
    omGiverAddress_old,
    tonConnectUI,
    jettonMasterAddress,
    jettonMasterAddress_old
  } = useWalletContext();
  const giverAddress = old ? omGiverAddress_old : omGiverAddress;
  const jettonMasterAddr = old ? jettonMasterAddress_old : jettonMasterAddress;
  const collectRewards = useCallback(
    async (
      eligibleNfts: NftItem[],
      setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void,
      setCollectRewardsError: (collectRewardsError: string | null) => void
    ) => {
      if (!tonClient || !sender || !walletAddress || !tonApi || !tonConnectUI) return;
      
      // Set pending state to true at the beginning
      setIsCollectRewardsPending(true);
      
      const minAttach = toNano("0.12");
      
      // Limit to 4 NFTs or less
      const nftsToProcess = eligibleNfts.slice(0, 4);
      const nftsCount = nftsToProcess.length;

      try {
        // Check TON balance
        const balance_ = (
          await tonApi.accounts.getAccount(Address.parse(walletAddress))
        ).balance;

        if (!balance_ || balance_ < minAttach * BigInt(nftsCount)) {
          console.log(balance_);
          setIsCollectRewardsPending(false);
          setCollectRewardsError(
            `Not enough TON balance (need at least ${fromNano(minAttach * BigInt(nftsCount))} TON)`
          );
          return;
        }

        // Send transactions
        const messages: {address: string, amount: string, payload: string}[] = [];
        for (const nft of nftsToProcess) {
          messages.push({
            address: nft.address.toString(),
            amount: minAttach.toString(),
            payload: beginCell().store(storeNFTTransfer({
              $$type: "NFTTransfer",
              queryId: randomInt(),
              newOwner: giverAddress,
              responseDestination: Address.parse(walletAddress),
              customPayload: null,
              forwardAmount: toNano("0.11"),
              forwardPayload: beginCell().storeUint(nft.index, 256).endCell(),
            })).endCell().toBoc().toString("base64")
          });
        };
        await tonConnectUI.sendTransaction({
          messages: messages,
          validUntil: Date.now() + 3 * 60 * 1000,
        });

        // Start polling for transaction completion
        const timeoutDuration = 300000; // 5 minutes timeout
        const startTime = Date.now();

        let orbcBalance = 0n;
        try {
          orbcBalance = (await tonApi.accounts.getAccountJettonBalance(Address.parse(walletAddress), jettonMasterAddr)).balance;
        } catch (error) {
          console.error(error);
        }

        const checkTransaction = async () => {
          if (Date.now() - startTime > timeoutDuration) {
            throw new Error("Transaction timeout");
          }
          console.log("Checking transaction...");
          // Fetch latest blockchain data to check if NFT was minted
          const orbcBalanceNew = (await tonApi.accounts.getAccountJettonBalance(Address.parse(walletAddress), jettonMasterAddr)).balance;
          if (orbcBalanceNew > orbcBalance) return true;
          // Wait 10 seconds before next check
          await new Promise((resolve) => setTimeout(resolve, 10000));
          return checkTransaction();
        };

        await checkTransaction();
        setIsCollectRewardsPending(false);
        console.log("Transaction completed");
      } catch (error) {
        console.error(error);
        setCollectRewardsError(`Error sending NFTTransfer: ${error}`);
        // Also set pending state to false in case of errors
        setIsCollectRewardsPending(false);
      } finally {
        console.log("Transaction processing finished");
      }
    },
    [tonClient, tonApi, sender, walletAddress, giverAddress, jettonMasterAddr, tonConnectUI]
  );

  return collectRewards;
}
