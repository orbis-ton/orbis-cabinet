import { useCallback, useEffect, useState } from "react";
import { OMGiver } from "@/lib/OMGiver";
import { useWalletContext } from "../contexts/wallet-context";

// Distribution frequency in milliseconds (1 week)
const DISTRIBUTION_FREQ = BigInt(1000 * 60 * 60 * 24 * 7);

export function useNextDistributionTime() {
  const { tonClient, omGiverAddress } = useWalletContext();
  
  const [nextDistributionTime, setNextDistributionTime] = useState<Date>(
    new Date('2025-04-12')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNextDistributionTime = useCallback(async () => {
    if (!tonClient) return;

    setIsLoading(true);
    setError(null);

    try {
      const giver = tonClient.open(OMGiver.fromAddress(omGiverAddress));
      const lastDistributionTime = (await giver.getGetGiverData())
        .lastRewardDistribution;
      
      const defaultDistributionTime = BigInt(new Date('2025-04-12').getTime());

      const nextTimeBigInt =
        lastDistributionTime === 0n
          ? defaultDistributionTime
          : lastDistributionTime * 1000n + DISTRIBUTION_FREQ;

      // Convert BigInt to Date
      const nextTime = new Date(Number(nextTimeBigInt));
      setNextDistributionTime(nextTime);
    } catch (err) {
      console.error("Error fetching next distribution time:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [tonClient, omGiverAddress]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchNextDistributionTime();
  }, [fetchNextDistributionTime]);

  return {
    nextDistributionTime,
    isLoading,
    error,
    refetch: fetchNextDistributionTime,
  };
}
