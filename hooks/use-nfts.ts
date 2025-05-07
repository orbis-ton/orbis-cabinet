import { useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { TonApiClient, NftItem } from "@ton-api/client";
import { usePolling } from "./polling";
import { useWalletContext } from "../contexts/wallet-context";
import { OMGiver } from "@/lib/OMGiver";
import { NftItemTemplate } from "@/lib/NftItem";

export function useNfts() {
  const { walletAddress, tonApi, tonClient, nftCollectionAddress, nftCollectionAddress_old, omGiverAddress, omGiverAddress_old} =
    useWalletContext();

  const [userNfts, setUserNfts] = useState<NftItem[] | null>(null);
  const [eligibleNfts, setEligibleNfts] = useState<NftItem[]>([]);
  const [unclaimedReward, setUnclaimedReward] = useState<bigint>(BigInt(0));
  const [allNftAddresses, setAllNftAddresses] = useState<Address[]>([]);
  
  // State for old NFT data
  const [userNfts_old, setUserNfts_old] = useState<NftItem[] | null>(null);
  const [eligibleNfts_old, setEligibleNfts_old] = useState<NftItem[]>([]);
  const [unclaimedReward_old, setUnclaimedReward_old] = useState<bigint>(BigInt(0));
  const [allNftAddresses_old, setAllNftAddresses_old] = useState<Address[]>([]);

  const [hasOldNfts, setHasOldNfts] = useState<boolean>(false);
  const [firstFourEligibleAmount, setFirstFourEligibleAmount] = useState<bigint>(BigInt(0));
  
  // Reset NFT data when wallet address changes
  useEffect(() => {
    setUserNfts(null);
    setAllNftAddresses([]);
    setEligibleNfts([]);
    setUnclaimedReward(BigInt(0));
    setUserNfts_old(null);
    setAllNftAddresses_old([]);
    setEligibleNfts_old([]);
    setUnclaimedReward_old(BigInt(0));
    setFirstFourEligibleAmount(BigInt(0));
  }, [walletAddress]);

  const isOldUser_ = useCallback(async (): Promise<boolean> => {
    if (!tonApi || !tonClient || !walletAddress) return false;
    const userNfts_old_ = (await tonApi.accounts.getAccountNftItems(Address.parse(walletAddress))).nftItems.filter(nft => nft.collection!.address.equals(nftCollectionAddress_old));
    console.log("userNfts_old_", userNfts_old_);
    return userNfts_old_.length > 0;
  }, [tonApi, tonClient, walletAddress, nftCollectionAddress_old]);

  const fetchNftData = useCallback(async (isOld: boolean = false): Promise<[Address[], NftItem[], NftItem[], BigInt, BigInt]> => {
    if (!tonApi || !tonClient || !walletAddress) return [[], [], [], BigInt(0), BigInt(0)];
    console.log("fetchNftData", isOld);
    try {
      const collectionAddress = isOld ? nftCollectionAddress_old : nftCollectionAddress;
      const giverAddress = isOld ? omGiverAddress_old : omGiverAddress;
      
      const allNfts_ = await tonApi.nft.getItemsFromCollection(collectionAddress);
      const nftAddresses = Array.isArray(allNfts_.nftItems)
        ? allNfts_.nftItems.map((nft) => nft.address)
        : [];
      if (isOld) {
        setAllNftAddresses_old(nftAddresses);
      }
      else {
        setAllNftAddresses(nftAddresses);
      }
        
      const userNfts_ = allNfts_.nftItems.filter((nft) =>
        nft.owner!.address.equals(Address.parse(walletAddress))
      );
      if (isOld) {
        setUserNfts_old(userNfts_);
      }
      else {
        console.log("userNfts_", userNfts_);
        setUserNfts(userNfts_);
      }
    
      const eligibleNfts_: NftItem[] = [];
      let totalAmount = BigInt(0);
      let firstFourEligibleAmount_ = BigInt(0);
      const giver = tonClient.open(OMGiver.fromAddress(giverAddress));
      const toDistribute = (await giver.getGetGiverData()).toDistribute;
      
      for (const nft of userNfts_) {
        const amount = toDistribute.get(nft.index);
        if (amount && amount > 0n) {
          eligibleNfts_.push(nft);
          totalAmount += amount;
          if (isOld) {
            setEligibleNfts_old(eligibleNfts_);
            setUnclaimedReward_old(totalAmount);
          }
          else {
            setEligibleNfts(eligibleNfts_);
            setUnclaimedReward(totalAmount);
          }
          if (eligibleNfts_.length <= 4) {
            firstFourEligibleAmount_ += amount;
            setFirstFourEligibleAmount(firstFourEligibleAmount_);
          }
        }
      }

      return [nftAddresses, userNfts_, eligibleNfts_, totalAmount, firstFourEligibleAmount];
    } catch (error) {
      console.error(`Error fetching ${isOld ? 'old' : 'current'} NFT data:`, error);
      return [[], [], [], BigInt(0), BigInt(0)];
    }
  }, [tonApi, tonClient, walletAddress, nftCollectionAddress, nftCollectionAddress_old, omGiverAddress, omGiverAddress_old]);

  useEffect(() => {
    if (!walletAddress) return;
    (async () => {
      const hasOld = await isOldUser_();
      setHasOldNfts(hasOld);
      console.log("hasOldNfts", hasOld);
    })();
  }, [isOldUser_]);

  return {
    userNfts,
    allNftAddresses,
    eligibleNfts,
    unclaimedReward,
    
    userNfts_old,
    allNftAddresses_old,
    eligibleNfts_old,
    unclaimedReward_old,

    fetchNftData,
    hasOldNfts,
    firstFourEligibleAmount
  };
}
