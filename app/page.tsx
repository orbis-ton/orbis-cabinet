"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Address } from "@ton/ton";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { GiverAdminCard } from "@/components/giver-admin-card";
import { Transactions } from "@/components/transactions";
import { useBalances } from "@/hooks/use-balances";
import { useNfts } from "@/hooks/use-nfts";
import { useNftPurchase } from "@/hooks/use-nft-purchase";
import { useTransactions } from "@/hooks/use-transactions";
import { useNextDistributionTime } from "@/hooks/use-next-distribution-time";
import { useCollectRewards } from "@/hooks/use-collect-rewards";
import { useAdminActions } from "@/hooks/use-admin-actions";
import { WalletContextProvider, useWalletContext } from "@/contexts/wallet-context";

function ProfilePageContent() {
  // Context hooks
  const { t } = useLanguage();
  const { isConnected, isAdmin, walletAddress, tonClient, omGiverAddress } = useWalletContext();

  // Use hooks without passing repeated parameters
  const { balance, balanceORBC, fetchBalances } = useBalances();
  const { userNfts, allNftAddresses, eligibleNfts, unclaimedReward, fetchNftData } = useNfts();
  const buyNft = useNftPurchase(fetchNftData);
  const collectRewards = useCollectRewards();
  const { calculateDistribution } = useAdminActions();
  const { actions, fetchTransactions } = useTransactions();

  // Effect hooks
  useEffect(() => {
    if (isConnected) {
      fetchBlockchainData();
    }
  }, [isConnected, walletAddress]);

  async function fetchBlockchainData() {
    try {
      await fetchBalances();
      await fetchNftData();
      await fetchTransactions(allNftAddresses);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
    }
  }

  if (!isConnected) {
    return <ConnectWalletCard />;
  }

  return (
    <div className="w-full max-w-6xl">
      {isAdmin && (
        <GiverAdminCard 
          calculateDistribution={calculateDistribution}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Account Info Block */}
        <AccountCard
          walletAddress={walletAddress}
          balance={balance}
          balanceORBC={balanceORBC}
        />
        {/* NFT Block */}
        <NftCard
          userNfts={userNfts}
          buyNft={buyNft}
          collectRewards={collectRewards}
          eligibleNfts={eligibleNfts}
          unclaimedReward={unclaimedReward}
        />
      </div>

      {/* Transactions Block */}
      <Transactions actions={actions} walletAddress={walletAddress} />
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
