"use client";

import { useLanguage } from "@/contexts/language-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NftItem } from "@ton-api/client";
import { useState } from "react";
import { fromNano } from "@ton/ton";

interface CollectRewardsButtonProps {
  eligibleNfts: NftItem[];
  unclaimedReward: BigInt;
  collectRewards: (
    eligibleNfts: NftItem[],
    setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void,
    setCollectRewardsError: (collectRewardsError: string | null) => void
  ) => void;
  isCollectRewardsPending: boolean;
  collectRewardsError: string | null;
  setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void;
  setCollectRewardsError: (collectRewardsError: string | null) => void;
}

export function CollectRewardsButton({
  eligibleNfts,
  unclaimedReward,
  collectRewards,
  isCollectRewardsPending,
  collectRewardsError,
  setIsCollectRewardsPending,
  setCollectRewardsError,
}: CollectRewardsButtonProps) {
  const { t } = useLanguage();

  return isCollectRewardsPending ? (
    <div className="flex flex-col items-center py-8">
      <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
      <p>{t("profile.processingTransaction")}</p>
    </div>
  ) : (
    <div className="mb-2">
      <Button
        onClick={() =>
          collectRewards(
            eligibleNfts,
            setIsCollectRewardsPending,
            setCollectRewardsError
          )
        }
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("profile.collectRewards")} ({fromNano(unclaimedReward.toString())} ORBC)
      </Button>
      {collectRewardsError && (
        <p className="text-red-500 text-sm mt-2">{collectRewardsError}</p>
      )}
    </div>
  );
}
