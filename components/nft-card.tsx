"use client";

import { useLanguage } from "@/contexts/language-context";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NftItem } from "@ton-api/client";
import { BuyNftButton } from "./buy-nft-button";
import { CollectRewardsButton } from "./collect-rewards-button";
import { StackedNfts } from "./stacked-nfts";
import { useState } from "react";
import { useNextDistributionTime } from "@/hooks/use-next-distribution-time";

interface NftCardProps {
  userNfts: NftItem[] | null;
  buyNft: (
    setIsBuyNftPending: (isBuyNftPending: boolean) => void,
    setBuyNftError: (buyNftError: string | null) => void
  ) => void;
  collectRewards: (
    userNfts: NftItem[],
    setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void,
    setCollectRewardsError: (collectRewardsError: string | null) => void
  ) => void;
  eligibleNfts: NftItem[];
  unclaimedReward: bigint;
}

export function NftCard({
  userNfts,
  buyNft,
  collectRewards,
  eligibleNfts,
  unclaimedReward
}: NftCardProps) {
  const { t } = useLanguage();

  const [isBuyNftPending, setIsBuyNftPending] = useState(false);
  const [buyNftError, setBuyNftError] = useState<string | null>(null);

  const [isCollectRewardsPending, setIsCollectRewardsPending] = useState(false);
  const [collectRewardsError, setCollectRewardsError] = useState<string | null>(null);

  const { nextDistributionTime } = useNextDistributionTime();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("profile.nftTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {userNfts === null ? (
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
        ) : userNfts.length === 0 ? (
          <BuyNftButton
            isBuyNftPending={isBuyNftPending}
            buyNftError={buyNftError}
            buyNft={buyNft}
            setIsBuyNftPending={setIsBuyNftPending}
            setBuyNftError={setBuyNftError}
          />
        ) : (
          <div className="flex flex-col items-center">
            <StackedNfts userNfts={userNfts} />
            <div className="text-center mb-4">
              <p className="font-medium mt-2">{userNfts.length} OM (NFT)</p>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              <span className="font-medium">{t("profile.nextReward")}:</span>{" "}
              {nextDistributionTime.toLocaleDateString()}
            </div>
            {/* <div className="flex flex-row items-center"> */}
            {unclaimedReward > 0n && <CollectRewardsButton
              eligibleNfts={eligibleNfts}
              unclaimedReward={unclaimedReward}
              collectRewards={collectRewards}
              isCollectRewardsPending={isCollectRewardsPending}
              collectRewardsError={collectRewardsError}
              setIsCollectRewardsPending={setIsCollectRewardsPending}
              setCollectRewardsError={setCollectRewardsError}
            /> }
            <BuyNftButton
              isBuyNftPending={isBuyNftPending}
              buyNftError={buyNftError}
              buyNft={buyNft}
              setIsBuyNftPending={setIsBuyNftPending}
              setBuyNftError={setBuyNftError}
            />
            {/* </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
