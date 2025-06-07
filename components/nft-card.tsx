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
import { MyNft, UnclaimedRewardsData, useMyNfts } from "@/hooks/use-nfts";
import { useCollectRewards } from "@/hooks/use-collect-rewards";
import { useNftPurchase } from "@/hooks/use-nft-purchase";
import { useBalancesContext } from "@/contexts/balances-context";

interface NftCardProps {
  userNfts: MyNft[] | null;
  unclaimed: UnclaimedRewardsData;
}

export function NftCard({
  userNfts,
  unclaimed,
}: NftCardProps) {
  const { t } = useLanguage();
  const { fetchMyNfts } = useMyNfts("3");
  const { getTonBalance, getJettonBalance } = useBalancesContext();
  const buyNft = useNftPurchase(fetchMyNfts, getTonBalance, getJettonBalance);

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
            {unclaimed.totalUnclaimed > 0n && <CollectRewardsButton
              eligibleNfts={unclaimed.eligibleNfts}
              unclaimedReward={unclaimed.totalUnclaimed}
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
