import { useCallback } from "react";
import { Address } from "@ton/ton";
import { useWalletContext } from "../contexts/wallet-context";
import { OMGiver } from "@/lib/OMGiver";
import { nftHolders } from "@/lib/utils";
import { useOrbData, type NFT } from "@/contexts/orb-data-context";

// Types for NFT and unclaimed rewards data
export type MyNft = { owner: Address; item: Address; index: number; claimable: bigint, address: Address };
export type UnclaimedRewardsData = {
  eligibleNfts: NFT[];
  firstFourEligibleAmount: bigint;
  totalUnclaimed: bigint;
};

export function useAllNfts(slug: "1" | "2" | "3") {
  const { 
    walletAddress, tonApi, tonClient, 
    nftCollectionAddress_1, nftCollectionAddress_2, nftCollectionAddress_3, 
    omGiverAddress_1, omGiverAddress_2, omGiverAddress_3 } = useWalletContext();
  
  const giverAddress = slug === "1" ? omGiverAddress_1 : slug === "2" ? omGiverAddress_2 : omGiverAddress_3;
  const collectionAddress = slug === "1" ? nftCollectionAddress_1 : slug === "2" ? nftCollectionAddress_2 : nftCollectionAddress_3;

  const fetchAllNftOwners = useCallback(async () => {
    if (!tonApi || !tonClient || !walletAddress) return;
    const owners = await nftHolders(tonClient, tonApi, collectionAddress, giverAddress);
    return owners;
  }, [tonApi, tonClient, walletAddress, collectionAddress]);
  
  return {
    fetchAllNftOwners
  }
}

export function useMyNfts(slug: "1" | "2" | "3") {
  const { walletAddress, tonClient, nftCollectionAddress_1, nftCollectionAddress_2, nftCollectionAddress_3 } = useWalletContext();
  const { tokens, nfts, isLoading, fetchData } = useOrbData();

  const fetchMyNfts = useCallback(async () => {
    if (nfts === null || nfts === undefined) return [];
    const collectionAddress = slug === "1" ? nftCollectionAddress_1 : slug === "2" ? nftCollectionAddress_2 : nftCollectionAddress_3;
    return nfts.filter(nft => nft.collection.equals(collectionAddress));
  }, [nfts]);
  
  return {
    fetchMyNfts
  }
}

export function useUnclaimedRewards(slug: "1" | "2" | "3") {
  const { walletAddress, tonApi, tonClient, omGiverAddress_1, omGiverAddress_2, omGiverAddress_3} =
    useWalletContext();
  const { fetchMyNfts } = useMyNfts(slug);

  const fetchUnclaimedRewardsData = useCallback(async (): Promise<UnclaimedRewardsData> => {
    if (!tonApi || !tonClient || !walletAddress) {
      return { eligibleNfts: [], firstFourEligibleAmount: 0n, totalUnclaimed: 0n };
    }
    const myNfts = await fetchMyNfts();

    const eligibleNfts: NFT[] = [];
    let firstFourEligibleAmount = BigInt(0);

    for (const nft of myNfts) {
      const amount = nft.claimableAmount;
      if (!amount) continue;
      if (amount == 0n) continue;

      eligibleNfts.push(nft);
      if (eligibleNfts.length <= 4) {
        firstFourEligibleAmount += amount;
      }
    }

    return {
      eligibleNfts,
      firstFourEligibleAmount,
      totalUnclaimed: eligibleNfts.map(nft => nft.claimableAmount).reduce((a, b) => a + b, 0n)
    };
  }, [tonApi, tonClient, walletAddress, fetchMyNfts]);
  
  return {
    fetchUnclaimedRewardsData
  }
}

