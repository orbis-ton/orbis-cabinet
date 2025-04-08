"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Address } from "@ton/ton";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { Transactions } from "@/components/transactions";
import { useBalances } from "@/hooks/use-balances";
import { useNfts } from "@/hooks/use-nfts";
import { useNftPurchase } from "@/hooks/use-nft-purchase";
import { useTransactions } from "@/hooks/use-transactions";
import { useWalletConnection } from "@/hooks/use-wallet-connection";
import { useNextDistributionTime } from "@/hooks/use-next-distribution-time";

const jettonMasterAddress = Address.parse(
  process.env.NEXT_PUBLIC_JETTON_MASTER_ADDRESS!
);
const nftCollectionAddress = Address.parse(
  process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS!
);
const omGiverAddress = Address.parse(process.env.NEXT_PUBLIC_OMGIVER_ADDRESS!);

export default function ProfilePage() {
  // 1. Context hooks
  const { t } = useLanguage();

  // 2. Use the wallet connection hook
  const { isConnected, sender, tonApi, tonClient, walletAddress } = useWalletConnection();

  // 3. Use the balances hook
  const { balance, balanceORBC, fetchBalances, fetchORBCBalance } = useBalances(
    walletAddress,
    tonApi,
    jettonMasterAddress
  );

  // 4. Use the NFTs hook
  const { userNfts, allNftAddresses, fetchNftData } = useNfts(
    walletAddress,
    tonApi,
    nftCollectionAddress
  );

  // 5. Use the NFT purchase hook
  const { buyNft, buyingError, isTransactionPending } = useNftPurchase(
    walletAddress,
    tonClient,
    tonApi,
    sender,
    jettonMasterAddress,
    omGiverAddress,
    fetchNftData
  );

  // 6. Use the transactions hook
  const { actions, fetchTransactions } = useTransactions(
    walletAddress,
    tonApi,
    jettonMasterAddress,
    allNftAddresses
  );

  // 7. Use the next distribution time hook
  const { nextDistributionTime, isLoading: isLoadingNextDistribution } = useNextDistributionTime(
    tonClient,
    omGiverAddress
  );

  // 8. Effect hooks
  useEffect(() => {
    if (tonApi) {
      fetchBlockchainData();
    }
  }, [tonApi]);

  async function fetchBlockchainData() {
    if (!tonApi) return;
    try {
      await fetchBalances();
      await fetchNftData();
      await fetchTransactions();
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
    }
  }

  if (!isConnected) {
    return <ConnectWalletCard />;
  }

  return (
    <div className="w-full max-w-6xl">
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
          isTransactionPending={isTransactionPending}
          buyingError={buyingError}
          nextRewardDate={nextDistributionTime || new Date()}
        />
      </div>

      {/* Transactions Block */}
      <Transactions actions={actions} walletAddress={walletAddress} />
    </div>
  );
}
