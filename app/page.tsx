"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { GiverAdminCard } from "@/components/giver-admin-card";
import { Transactions } from "@/components/transactions";
import { UnclaimedRewardsData, MyNft, useMyNfts, useUnclaimedRewards } from "@/hooks/use-nfts";
import { useNftPurchase } from "@/hooks/use-nft-purchase";
import { useCollectRewards } from "@/hooks/use-collect-rewards";
import { useAdminActions } from "@/hooks/use-admin-actions";
import {
  WalletContextProvider,
  useWalletContext,
} from "@/contexts/wallet-context";
import { usePolling } from "@/hooks/polling";
import { BalancesContextProvider, useBalancesContext } from "@/contexts/balances-context";
import { ImpersonateWallet } from "@/components/impersonate-wallet";

function ProfilePageContent() {
  // Context hooks
  const { isConnected, isAdmin } = useWalletContext();
  const { getJettonBalance } = useBalancesContext();

  const { fetchMyNfts } = useMyNfts("3");
  const { fetchUnclaimedRewardsData } = useUnclaimedRewards("3");

  
  const { calculateDistribution } = useAdminActions(getJettonBalance);

  const [userNfts, setUserNfts] = useState<MyNft[] | null>(null);
  const [unclaimedReward, setUnclaimedReward] = useState<UnclaimedRewardsData>({ eligibleNfts: [], firstFourEligibleAmount: 0n, totalUnclaimed: 0n });

  const fetchNftData = useCallback(async () => {
    const myNfts = await fetchMyNfts();
    const unclaimedRewardsData = await fetchUnclaimedRewardsData();

    if (myNfts.length !== userNfts?.length) {
      setUserNfts(myNfts);
    }
    if (unclaimedRewardsData.totalUnclaimed !== unclaimedReward.totalUnclaimed) {
      setUnclaimedReward(unclaimedRewardsData);
    }
  }, [fetchMyNfts, fetchUnclaimedRewardsData, userNfts, unclaimedReward]);

  usePolling(fetchNftData, 60000);

  if (!isConnected) {
    return <ConnectWalletCard />;
  }

  return (
    <div className="w-full max-w-6xl">
      {/* Uncomment for impersonation functionality in development */}
      <ImpersonateWallet />
      {isAdmin && (
        <GiverAdminCard calculateDistribution={calculateDistribution} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AccountCard />
        <NftCard
          userNfts={userNfts}
          unclaimed={unclaimedReward}
        />
      </div>

      {/* Transactions Block */}
      <Transactions />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <WalletContextProvider>
      <BalancesContextProvider>
        <ProfilePageContent />
      </BalancesContextProvider>
    </WalletContextProvider>
  );
}
