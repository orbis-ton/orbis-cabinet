import { createContext, useContext, ReactNode, useCallback, useState } from "react";
import { usePolling } from "@/hooks/polling";
import { Address } from "@ton/ton";
import { useWalletContext } from "./wallet-context";

const API_BASE_URL = "https://orb-data-service.fly.dev/api";

interface Token {
  address: Address;
  balance: bigint;
  symbol: string;
}

export interface NFT {
  address: Address;
  tokenId: bigint;
  collection: Address;
  claimableAmount: bigint;
}

interface OrbDataContextType {
  tokens: Token[] | null;
  nfts: NFT[] | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (address: Address) => Promise<void>;
}

const OrbDataContext = createContext<OrbDataContextType | undefined>(undefined);

function useProvideOrbData() {
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [nfts, setNfts] = useState<NFT[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (address: Address) => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/balances/${address.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert string addresses to Address objects and string numbers to bigint
      setTokens(data.tokens.map((token: any) => ({
        ...token,
        address: Address.parse(token.address),
        balance: BigInt(token.balance)
      })));
      
      setNfts(data.nfts.map((nft: any) => ({
        ...nft,
        address: Address.parse(nft.address),
        collection: Address.parse(nft.collection),
        tokenId: BigInt(nft.tokenId),
        claimableAmount: BigInt(nft.claimableAmount)
      })));
    } catch (err) {
      console.error("Error fetching orb data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tokens,
    nfts,
    isLoading,
    error,
    fetchData,
  };
}

export function OrbDataContextProvider({ 
  children,
  pollingInterval = 5000 // Default to 5 seconds
}: { 
  children: ReactNode;
  pollingInterval?: number;
}) {
  const { walletAddress } = useWalletContext();
  const value = useProvideOrbData();
  
  // Set up polling to fetch data regularly
  usePolling(() => value.fetchData(Address.parse(walletAddress)), pollingInterval);

  return (
    <OrbDataContext.Provider value={value}>
      {children}
    </OrbDataContext.Provider>
  );
}

export function useOrbData() {
  const context = useContext(OrbDataContext);
  if (context === undefined) {
    throw new Error("useOrbData must be used within an OrbDataContextProvider");
  }
  return context;
} 