"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { GiverAdminCard } from "@/components/giver-admin-card";
import { Transactions } from "@/components/transactions";
import { UnclaimedRewardsData, MyNft, useMyNfts, useUnclaimedRewards } from "@/hooks/use-nfts";
import { useAdminActions } from "@/hooks/use-admin-actions";
import {
  WalletContextProvider,
  useWalletContext,
} from "@/contexts/wallet-context";
import { BalancesContextProvider, useBalancesContext } from "@/contexts/balances-context";
import { ImpersonateWallet } from "@/components/impersonate-wallet";
import { OrbDataContextProvider, useOrbData, type NFT } from "@/contexts/orb-data-context";
import { NewTokenMigration } from "@/components/new-token-migration";

function ProfilePageContent() {
  // Context hooks
  const { isConnected, isAdmin, nftCollectionAddress_3 } = useWalletContext();
  console.log("### nftCollectionAddress_3", nftCollectionAddress_3.toString());
  const { getJettonBalance } = useBalancesContext();
  const { nfts, fetchData, isLoading } = useOrbData();
  const { calculateDistribution } = useAdminActions(getJettonBalance);

  const [userNfts, setUserNfts] = useState<NFT[] | null>(null);
  const [unclaimedReward, setUnclaimedReward] = useState<UnclaimedRewardsData>({ eligibleNfts: [], firstFourEligibleAmount: 0n, totalUnclaimed: 0n });

  useEffect(() => {
    if (!nfts) return;
    const myNfts = nfts.filter(nft => nft.collection.equals(nftCollectionAddress_3));
    const eligibleNfts = nfts.filter(
      nft => nft.collection.equals(nftCollectionAddress_3) && 
      nft.claimableAmount > 0n)
    const firstFourEligibleAmount = eligibleNfts?.slice(0, 4).reduce((acc, nft) => acc + nft.claimableAmount, 0n);
    const totalUnclaimed = eligibleNfts?.reduce((acc, nft) => acc + nft.claimableAmount, 0n);
    const unclaimedRewardsData: UnclaimedRewardsData = { 
      eligibleNfts: eligibleNfts || [],
      firstFourEligibleAmount: firstFourEligibleAmount || 0n, 
      totalUnclaimed: totalUnclaimed || 0n
    };

    if (myNfts?.length !== userNfts?.length) {
      setUserNfts(myNfts);
    }
    if (unclaimedRewardsData.totalUnclaimed !== unclaimedReward.totalUnclaimed) {
      setUnclaimedReward(unclaimedRewardsData);
    }
  }, [nfts]);

  if (!isConnected) {
    return
     <>
      <ConnectWalletCard />
      
     </>;
  }

  // Show NewTokenMigration when hash is #exchange
  // if (hash === "#exchange") {
  //   return (
  //     <div className="w-full max-w-2xl mx-auto">
  //       <NewTokenMigration />
  //     </div>
  //   );
  // }
  return (
    <div className="w-full max-w-6xl">
      {/* Uncomment for impersonation functionality in development */}
      {/* <ImpersonateWallet /> */}
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
      <OrbDataContextProvider>
      <BalancesContextProvider>
        <ProfilePageContent />
      </BalancesContextProvider>
      </OrbDataContextProvider>
    </WalletContextProvider>
  );
}
