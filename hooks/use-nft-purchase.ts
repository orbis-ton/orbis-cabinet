import { useCallback, useState } from "react";
import { Address, toNano } from "@ton/ton";
import { AccountStatus } from "@ton-api/client";
import { beginCell, fromNano } from "@ton/core";
import { JettonWallet } from "@/lib/JettonWallet";
import { randomInt } from "@/lib/utils";
import { useWalletContext } from "../contexts/wallet-context";

export function useNftPurchase(fetchNftData: () => Promise<[Address[], any[], any[], BigInt]>) {
  const { 
    walletAddress,
    tonClient,
    tonApi,
    sender,
    jettonMasterAddress,
    omGiverAddress
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
        // Get jetton wallet address
        const jettonWalletAddress = Address.parse(
          (
            await tonApi.blockchain.execGetMethodForBlockchainAccount(
              jettonMasterAddress,
              "get_wallet_address",
              { args: [walletAddress] }
            )
          ).decoded.jetton_wallet_address
        );

        // Check if jetton wallet exists
        const jettonWalletExists =
          (await tonApi.accounts.getAccount(jettonWalletAddress)).status ===
          AccountStatus.Active;

        // Check TON balance
        const balance_ = (
          await tonApi.accounts.getAccount(Address.parse(walletAddress))
        ).balance;

        if (!balance_ || balance_ < minAttach) {
          console.log(balance_);
          setIsBuyNftPending(false);
          setBuyNftError(
            `Not enough TON balance (need at least ${fromNano(minAttach)} TON)`
          );
          return;
        }

        // Check ORBC balance
        const orbcBalance = jettonWalletExists
          ? await tonApi.accounts.getAccountJettonBalance(
              Address.parse(walletAddress),
              jettonMasterAddress
            )
          : { balance: 0n };

        if (!jettonWalletExists || orbcBalance.balance < 10000n) {
          setIsBuyNftPending(false);
          setBuyNftError("Not enough ORBC balance");
          return;
        }

        // Send transaction
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
            amount: 10000n,
            destination: omGiverAddress,
            responseDestination: Address.parse(walletAddress),
            customPayload: null,
            forwardPayload: beginCell().storeUint(0, 1).asSlice(),
            forwardTonAmount: mintAttach,
          }
        );

        // Start polling for transaction completion
        const timeoutDuration = 300000; // 5 minutes timeout
        const startTime = Date.now();

        const [, userNfts_] = await fetchNftData();
        const prevNftLength = userNfts_.length || 0;

        const checkTransaction = async () => {
          if (Date.now() - startTime > timeoutDuration) {
            throw new Error("Transaction timeout");
          }
          console.log("Checking transaction...");
          // Fetch latest blockchain data to check if NFT was minted
          const [, userNfts_] = await fetchNftData();
          console.log("User NFTs:", userNfts_);
          // If we see the NFT in userNfts, transaction was successful
          if (userNfts_.length > prevNftLength) {
            console.log(
              "Transaction successful",
              userNfts_.length,
              prevNftLength
            );
            return true;
          }

          // Wait 10 seconds before next check
          await new Promise((resolve) => setTimeout(resolve, 10000));
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
      jettonMasterAddress,
      omGiverAddress,
      fetchNftData,
    ]
  );

  return buyNft;
}
