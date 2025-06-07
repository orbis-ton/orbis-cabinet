import { useCallback } from "react";
import { Address, toNano } from "@ton/ton";
import { beginCell, fromNano } from "@ton/core";
import { useWalletContext } from "../contexts/wallet-context";
import { OMGiver } from "@/lib/OMGiver2";

export function useAdminActions(fetchORBCBalance: (walletAddress: Address | null, jettonMasterAddress: Address) => Promise<bigint>) {
  const {
    walletAddress,
    tonClient,
    tonApi,
    sender,
    omGiverAddress,
    jettonMasterAddress
  } = useWalletContext();

  const calculateDistribution = useCallback(
    async (
      setIsCalculatingDistribution: (isCalculating: boolean) => void,
      setCalculateDistributionError: (error: string | null) => void
    ) => {
      if (!tonClient || !sender || !walletAddress || !tonApi) return;
      const giver = await tonClient.open(OMGiver.fromAddress(omGiverAddress));
      const giverData = await giver.getGetGiverData();
      const minAttach = toNano("0.31") * giverData.nextItemIndex / 100n;

      try {
        setIsCalculatingDistribution(true);
        setCalculateDistributionError(null);

        // Check TON balance
        const balance_ = (
          await tonApi.accounts.getAccount(Address.parse(walletAddress))
        ).balance;

        const ORBCBalance = await fetchORBCBalance(omGiverAddress, jettonMasterAddress);

        console.log("balance", ORBCBalance, giverData.balance);

        if (!balance_ || balance_ < minAttach) {
          setIsCalculatingDistribution(false);
          setCalculateDistributionError(
            `Not enough TON balance (need at least ${fromNano(minAttach.toString())} TON)`
          );
          return;
        }

        // Send calculate distribution transaction
        await giver.send(
          sender,
          {
            value: minAttach,
            bounce: true,
          },
          {
            $$type: "CalculateDistribution",
            // chunkSize: 100n,
            // currentBalance: 27182896062232494n + 10000000000000n // ORBCBalance > giverData.balance ? ORBCBalance : null,
            // currentBalance: balance + amountNFTPurchasedSinceLastDistribution * nftPrice,
            currentBalance: 27852614699015270n
          }
        );

        console.log("Calculate distribution transaction sent");
      } catch (error) {
        console.error(error);
        setCalculateDistributionError(`Error calculating distribution: ${error}`);
      } finally {
        setIsCalculatingDistribution(false);
      }
    },
    [tonClient, tonApi, sender, walletAddress, omGiverAddress]
  );

  return {
    calculateDistribution
  };
} 