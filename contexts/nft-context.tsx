import { createContext, useContext, ReactNode, useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { AccountStatus, NftItem } from "@ton-api/client";
import { useWalletContext } from "./wallet-context";
import { usePolling } from "@/hooks/polling";
import { getJWAddress } from "@/lib/utils";

interface NftsContextType {
  nft1: Array<bigint> | null;
  nft2: Array<bigint> | null;
  nft3: Array<bigint> | null;
  
  eligible1: Array<bigint> | null;
  eligible2: Array<bigint> | null;
  eligible3: Array<bigint> | null;
}

const NftsContext = createContext<NftsContextType | undefined>(undefined);

function useProvideNfts() {
  const {
    walletAddress,
    tonApi,
    tonClient,
    nftCollectionAddress_1,
    nftCollectionAddress_2,
    nftCollectionAddress_3,
  } = useWalletContext();

  const [allNfts1, setAllNfts1] = useState<Array<NftItem> | null>(null);
  const [allNfts2, setAllNfts2] = useState<Array<NftItem> | null>(null);
  const [allNfts3, setAllNfts3] = useState<Array<NftItem> | null>(null);
  
  const [nft1, setNft1] = useState<Array<bigint> | null>(null);
  const [nft2, setNft2] = useState<Array<bigint> | null>(null);
  const [nft3, setNft3] = useState<Array<bigint> | null>(null);
  
  const [eligible1, setEligible1] = useState<Array<bigint> | null>(null);
  const [eligible2, setEligible2] = useState<Array<bigint> | null>(null);
  const [eligible3, setEligible3] = useState<Array<bigint> | null>(null);

  useEffect(() => {
    setAllNfts1(null);
    setAllNfts2(null);
    setAllNfts3(null);
    setNft1(null);
    setNft2(null);
    setNft3(null);
    setEligible1(null);
    setEligible2(null);
    setEligible3(null);
  }, [walletAddress, nftCollectionAddress_1, nftCollectionAddress_2, nftCollectionAddress_3]);

  

  const updateNfts = useCallback(async () => {
    if (!tonApi || !walletAddress || !tonClient) return;
    try {
      
    } catch (error) {
      console.error("Error fetching nfts:", error);
    }
  }, [tonApi, walletAddress, nftCollectionAddress_1, nftCollectionAddress_2, nftCollectionAddress_3]);

  return {
    nft1,
    nft2,
    nft3,

    eligible1,
    eligible2,
    eligible3,

    updateNfts,
  };
}

export function NftsContextProvider({ children }: { children: ReactNode }) {
  const value = useProvideNfts();
  usePolling(value.updateNfts, 10000);
  return (
    <NftsContext.Provider value={value}>
      {children}
    </NftsContext.Provider>
  );
}

export function useBalancesContext() {
  const context = useContext(NftsContext);
  if (context === undefined) {
    throw new Error("useNftsContext must be used within a NftsContextProvider");
  }
  return context;
} 