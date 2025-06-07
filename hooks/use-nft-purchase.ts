import { useCallback } from "react";
import { Address, toNano } from "@ton/ton";
import { beginCell, fromNano } from "@ton/core";
import { JettonWallet } from "@/lib/JettonWallet";
import { randomInt } from "@/lib/utils";
import { useWalletContext } from "../contexts/wallet-context";
import { MyNft } from "./use-nfts";

export function useNftPurchase(
  fetchMyNfts: () => Promise<MyNft[]>,
  getTonBalance: (address: Address) => Promise<bigint>,
  getJettonBalance: (address: Address | null, jettonMasterAddress: Address) => Promise<bigint>,
) {
  const { 
    walletAddress,
    tonClient,
    tonApi,
    sender,
    jettonMasterAddress_3,
    jettonWalletAddress_3,
    omGiverAddress_3,
  } = useWalletContext();

  const buyNft = useCallback(
    async (
      setIsBuyNftPending: (isBuyNftPending: boolean) => void,
      setBuyNftError: (buyNftError: string | null) => void
    ) => {
      if (!tonClient || !sender || !walletAddress || !tonApi) return;

      const minAttach = toNano("0.3");
      const mintAttach = toNano("0.2");

      try {



        // Check TON balance
        const balance_ = await getTonBalance(Address.parse(walletAddress));
        const jettonBalance = await getJettonBalance(Address.parse(walletAddress), jettonMasterAddress_3);

        if (!balance_ || balance_ < minAttach) {
          setIsBuyNftPending(false);
          setBuyNftError(
            `Not enough TON balance (need at least ${fromNano(minAttach)} TON)`
          );
          return;
        }

        if (jettonBalance < toNano(1)) {
          setIsBuyNftPending(false);
          setBuyNftError("Not enough ORBC balance");
          return;
        }

        // Send transaction
        const jettonWallet = tonClient.open(
          JettonWallet.fromAddress(jettonWalletAddress_3!)
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
            amount: toNano(10000),
            destination: omGiverAddress_3,
            responseDestination: Address.parse(walletAddress),
            customPayload: null,
            forwardPayload: beginCell().storeUint(0, 1).asSlice(),
            forwardTonAmount: mintAttach,
          }
        );

        // Start polling for transaction completion
        const timeoutDuration = 300000; // 5 minutes timeout
        const startTime = Date.now();

        const myNfts = await fetchMyNfts();
        const prevNftLength = myNfts.length || 0;

        const checkTransaction = async () => {
          setIsBuyNftPending(true);
          // Wait 10 seconds before next check
          await new Promise((resolve) => setTimeout(resolve, 10000));
          
          if (Date.now() - startTime > timeoutDuration) {
            throw new Error("Transaction timeout");
          }
          console.log("Checking transaction...");
          // Fetch latest blockchain data to check if NFT was minted
          const myNfts = await fetchMyNfts();
          console.log("User NFTs:", myNfts);
          // If we see the NFT in userNfts, transaction was successful
          if (myNfts.length > prevNftLength) {
            console.log(
              "Transaction successful",
              myNfts.length,
              prevNftLength
            );
            return true;
          }

          return checkTransaction();
        };

        await checkTransaction();
        console.log("Transaction completed");
      } catch (error) {
        console.error(error);
        setBuyNftError(`Error sending JettonTransfer: ${error}`);
      } finally {
        setIsBuyNftPending(false);
        console.log("Transaction processing finished");
      }
    },
    [
      tonClient,
      tonApi,
      sender,
      walletAddress,
      jettonMasterAddress_3,
      omGiverAddress_3,
      fetchMyNfts,
      getTonBalance,
      getJettonBalance,
    ]
  );

  return buyNft;
}
