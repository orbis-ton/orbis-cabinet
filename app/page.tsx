"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { GiverAdminCard } from "@/components/giver-admin-card";
import { Transactions } from "@/components/transactions";
import { useBalances } from "@/hooks/use-balances";
import { useNfts } from "@/hooks/use-nfts";
import { useNftPurchase } from "@/hooks/use-nft-purchase";
import { useTransactions } from "@/hooks/use-transactions";
import { useCollectRewards } from "@/hooks/use-collect-rewards";
import { useAdminActions } from "@/hooks/use-admin-actions";
import {
  WalletContextProvider,
  useWalletContext,
} from "@/contexts/wallet-context";
import { usePolling } from "@/hooks/polling";
import { NewTokenMigration } from "@/components/new-token-migration";

function ProfilePageContent() {
  // Context hooks
  const { t } = useLanguage();
  const { isConnected, isAdmin, walletAddress } = useWalletContext();

  const { balance, balanceORBC, balanceORBC_old, fetchBalances, fetchORBCBalance } = useBalances();
  usePolling(fetchBalances, 10000);

  const {
    userNfts,
    userNfts_old,
    eligibleNfts,
    eligibleNfts_old,
    unclaimedReward,
    unclaimedReward_old,
    fetchNftData,
    hasOldNfts,
    firstFourEligibleAmount,
  } = useNfts();

  const buyNft = useNftPurchase(fetchNftData);
  const { calculateDistribution } = useAdminActions(fetchORBCBalance);

  // todo: effect on allNFTs(_old) change - set polling on load txs
  
  const migratedOrNewUser = balanceORBC_old === 0n && !hasOldNfts;
  // Fetch NFT data on initial load
  useEffect(() => {
    if (isConnected) {
      fetchNftData(!migratedOrNewUser);
    }
  }, [isConnected, fetchNftData]);
  usePolling(() => fetchNftData(!migratedOrNewUser), 60000);

  const collectRewards = useCollectRewards(!migratedOrNewUser);

  if (!isConnected) {
    return <ConnectWalletCard />;
  }

  return (
    <div className="w-full max-w-6xl">
      {isAdmin && (
        <GiverAdminCard calculateDistribution={calculateDistribution} />
      )}
      {!migratedOrNewUser && balanceORBC_old !== null && <NewTokenMigration
        userNfts_old={userNfts_old}
        balanceORBC_old={balanceORBC_old}
        unclaimedReward_old={unclaimedReward_old}
        eligibleNfts_old={eligibleNfts_old}
        collectRewards={collectRewards}
        firstFourEligibleAmount={firstFourEligibleAmount}
      />}
      {balanceORBC_old === null && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {migratedOrNewUser && <AccountCard
          walletAddress={walletAddress}
          balance={balance}
          balanceORBC={balanceORBC}
        />}
        {migratedOrNewUser && <NftCard
          userNfts={userNfts}
          buyNft={buyNft}
          collectRewards={collectRewards}
          eligibleNfts={eligibleNfts}
          unclaimedReward={unclaimedReward}
        />}
      </div>

      {/* Transactions Block */}
      {migratedOrNewUser && <Transactions />}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <WalletContextProvider>
      <ProfilePageContent />
    </WalletContextProvider>
  );
}
