import { useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { TonApiClient, NftItem } from "@ton-api/client";
import { usePolling } from "./polling";
import { useWalletContext } from "../contexts/wallet-context";
import { OMGiver } from "@/lib/OMGiver";
import { NftItemTemplate } from "@/lib/NftItem";

export function useNfts() {
  const { walletAddress, tonApi, tonClient, nftCollectionAddress, omGiverAddress } =
    useWalletContext();

  const [userNfts, setUserNfts] = useState<NftItem[] | null>(null);
  const [eligibleNfts, setEligibleNfts] = useState<NftItem[]>([]);
  const [unclaimedReward, setUnclaimedReward] = useState<bigint>(BigInt(0));
  const [allNftAddresses, setAllNftAddresses] = useState<Address[]>([]);

  // Reset NFT data when wallet address changes
  useEffect(() => {
    setUserNfts(null);
    setAllNftAddresses([]);
    setEligibleNfts([]);
    setUnclaimedReward(BigInt(0));
  }, [walletAddress]);

  const fetchNftData = useCallback(async (): Promise<
    [Address[], NftItem[], NftItem[], BigInt]
  > => {
    if (!tonApi || !tonClient || !walletAddress) return [[], [], [], BigInt(0)];
    try {
      const allNfts_ = await tonApi.nft.getItemsFromCollection(
        nftCollectionAddress
      );
      const nftAddresses = Array.isArray(allNfts_.nftItems)
        ? allNfts_.nftItems.map((nft) => nft.address)
        : [];

      const userNfts_ = allNfts_.nftItems.filter((nft) =>
        nft.owner!.address.equals(Address.parse(walletAddress))
      );

      const eligibleNfts_: NftItem[] = [];
      let totalAmount = BigInt(0);
      const giver = tonClient.open(OMGiver.fromAddress(omGiverAddress));
      const toDistribute = (await giver.getGetGiverData()).toDistribute;
      for (const nft of userNfts_) {
        const nftItem = await tonClient.open(
          NftItemTemplate.fromAddress(nft.address)
        );
        const index = (await nftItem.getGetNftData()).index;
        const amount = toDistribute.get(Number(index));
        if (amount && amount > 0n) {
          eligibleNfts_.push(nft);
          totalAmount += amount;
        }
      }

      setAllNftAddresses(nftAddresses);
      setUserNfts(userNfts_);
      setEligibleNfts(eligibleNfts_);
      setUnclaimedReward(totalAmount);

      return [nftAddresses, userNfts_, eligibleNfts_, totalAmount];
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      return [[], [], [], BigInt(0)];
    }
  }, [tonApi, walletAddress, nftCollectionAddress]);

  // Poll for NFT updates every 30 seconds
  usePolling(fetchNftData, 30000);

  return {
    userNfts,
    allNftAddresses,
    eligibleNfts,
    unclaimedReward,
    fetchNftData,
  };
}
