import { useCallback, useState } from "react";
import { Address, beginCell, fromNano, toNano } from "@ton/ton";
import { useWalletContext } from "../contexts/wallet-context";
import { NftItemTemplate, storeNFTTransfer } from "@/lib/NftItem";
import { JettonWallet } from "@/lib/JettonWallet";
import { randomInt } from "@/lib/utils";
import { MyNft, useMyNfts } from "./use-nfts";
import { useBalancesContext } from "@/contexts/balances-context";
import { NFT } from "@/contexts/orb-data-context";

export function useMigration() {
  const [isTxPending, setIsTxPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    tonClient,
    tonApi,
    sender,
    walletAddress,
    tonConnectUI,
    exchangerAddress_1,
    exchangerAddress_2,
    jettonMasterAddress_1,
    jettonMasterAddress_2,
    jettonMasterAddress_3,
    jettonWalletAddress_1,
    jettonWalletAddress_2,
  } = useWalletContext();

  const { getTonBalance, getJettonBalance } = useBalancesContext();
  const { fetchMyNfts: fetchMyNfts_2 } = useMyNfts("2");
  const { fetchMyNfts: fetchMyNfts_3 } = useMyNfts("3");

  

  const migrateNFTs = useCallback(
    async (slug: "1" | "2", userNfts_old: NFT[] | null) => {
      const fetchMyNfts = slug === "1" ? fetchMyNfts_2 : fetchMyNfts_3;
      const exchangerAddress = slug === "1" ? exchangerAddress_1 : exchangerAddress_2;
      if (
        !tonClient ||
        !tonApi ||
        !sender ||
        !walletAddress ||
        !tonConnectUI ||
        !userNfts_old ||
        !exchangerAddress
      )
        return;
      setIsTxPending(true);
      setError(null);

      const minAttach = toNano("0.12");
      // Limit to 4 NFTs or less
      const nftsToProcess = userNfts_old.slice(0, 4);
      const nftsCount = nftsToProcess.length;
      try {
        // Check TON balance
        const balance_ = await getTonBalance(Address.parse(walletAddress));
        if (!balance_ || balance_ < minAttach * BigInt(nftsCount)) {
          setIsTxPending(false);
          setError(
            `Not enough TON balance (need at least ${fromNano(
              minAttach * BigInt(nftsCount)
            )} TON)`
          );
          return;
        }

        /// build messages
        const messages: { address: string; amount: string; payload: string }[] = [];
        for (const nft of nftsToProcess) {
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
                  forwardPayload: beginCell().storeUint(nft.tokenId, 256).endCell(),
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
        const newNfts = await fetchMyNfts();

        const checkTransaction = async () => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          if (Date.now() - startTime > timeoutDuration) {
            throw new Error("Transaction timeout");
          }
          const newNfts_upd = await fetchMyNfts();
          if (newNfts_upd.length > newNfts.length) {
            return true;
          }
          
          return checkTransaction();
        };
        await checkTransaction();
      } catch (error: any) {
        setError(`${error}`);
      } finally {
        setIsTxPending(false);
      }
    },
    [
      tonClient,
      sender,
      walletAddress,
      tonApi,
      tonConnectUI,
      exchangerAddress_1,
      exchangerAddress_2,
      fetchMyNfts_2,
      fetchMyNfts_3,
      getTonBalance,
    ]
  );

  const migrateTokens = useCallback(
    async (
      slug: "1" | "2",
      balanceORBC_old: bigint | null
    ) => {
      const exchangerAddress = slug === "1" ? exchangerAddress_1 : exchangerAddress_2;
      const jettonMasterAddress = slug === "1" ? jettonMasterAddress_1 : jettonMasterAddress_2;
      const jettonMasterToCheck = slug === "1" ? jettonMasterAddress_2 : jettonMasterAddress_3;
      const jettonWalletAddress = slug === "1" ? jettonWalletAddress_1 : jettonWalletAddress_2;
      if (
        !tonClient ||
        !sender ||
        !walletAddress ||
        !tonApi ||
        !tonConnectUI ||
        !exchangerAddress ||
        !jettonMasterAddress ||
        !jettonWalletAddress ||
        !balanceORBC_old
      )
        return;

      setIsTxPending(true);
      setError(null);
      const minAttach = toNano("0.1");
      try {
        const balance_ = await getTonBalance(Address.parse(walletAddress));
        if (!balance_ || balance_ < minAttach) {
          setIsTxPending(false);
          setError(
            `Not enough TON balance (need at least ${fromNano(minAttach)} TON)`
          );
          return;
        }
        
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
        let orbcBalance = await getJettonBalance(Address.parse(walletAddress), jettonMasterToCheck);

        const checkTransaction = async () => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          if (Date.now() - startTime > timeoutDuration) {
            throw new Error("Transaction timeout");
          }
          try {
            const balanceNew = await getJettonBalance(Address.parse(walletAddress), jettonMasterToCheck);
            if (balanceNew > orbcBalance) {
              return true;
            }
          } catch (error) {}
          
          return checkTransaction();
        };
        await checkTransaction();
      } catch (error: any) {
        setError(`${error}`);
      } finally {
        setIsTxPending(false);
      }
    },
    [
      tonClient,
      sender,
      walletAddress,
      tonApi,
      tonConnectUI,
      exchangerAddress_1,
      exchangerAddress_2,
      jettonMasterAddress_1,
      jettonMasterAddress_2,
      jettonMasterAddress_3,
      jettonWalletAddress_1,
      jettonWalletAddress_2,
      getJettonBalance,
      getTonBalance,
    ]
  );

  return {
    migrateNFTs,
    migrateTokens,
    isTxPending,
    error,
    setError,
    setIsTxPending,
  };
} 