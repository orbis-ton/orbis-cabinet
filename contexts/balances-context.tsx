import { createContext, useContext, ReactNode, useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { AccountStatus } from "@ton-api/client";
import { useWalletContext } from "./wallet-context";
import { usePolling } from "@/hooks/polling";
import { getJWAddress } from "@/lib/utils";

interface BalancesContextType {
  tonBalance: bigint | null;
  balance1: bigint | null;
  balance2: bigint | null;
  balance3: bigint | null;
  fetchBalances: () => Promise<void>;
  getTonBalance: (address: Address) => Promise<bigint>;
  getJettonBalance: (address: Address | null, jettonMasterAddress: Address) => Promise<bigint>;
}

const BalancesContext = createContext<BalancesContextType | undefined>(undefined);

function useProvideBalances() {
  const {
    walletAddress,
    tonApi,
    tonClient,
    jettonWalletAddress_1,
    jettonWalletAddress_2,
    jettonWalletAddress_3,
  } = useWalletContext();

  const [tonBalance, setTonBalance] = useState<bigint | null>(null);
  const [balance1, setBalance1] = useState<bigint | null>(null);
  const [balance2, setBalance2] = useState<bigint | null>(null);
  const [balance3, setBalance3] = useState<bigint | null>(null);

  useEffect(() => {
    if (walletAddress || jettonWalletAddress_1 || jettonWalletAddress_2 || jettonWalletAddress_3) return;
    setTonBalance(null);
    setBalance1(null);
    setBalance2(null);
    setBalance3(null);
  }, [walletAddress, jettonWalletAddress_1, jettonWalletAddress_2, jettonWalletAddress_3]);

  const getTonBalance = useCallback(async (address: Address): Promise<bigint> => {
    if (!tonApi || !tonClient || !address) return 0n;
    const addressInfo = await tonApi.accounts.getAccount(address);
    return addressInfo.balance;
  }, [tonApi, tonClient]);

  const getJettonBalance = useCallback(async (address: Address | null, jettonMasterAddress: Address): Promise<bigint> => {
    if (!tonApi || !tonClient || !address) return 0n;
    const jettonWalletAddress = await getJWAddress(tonApi, jettonMasterAddress, address.toString());
    return await getJettonWalletBalance(jettonWalletAddress);
  }, [tonApi, tonClient]);

  const getJettonWalletBalance = useCallback(
    async (jettonWalletAddress: Address | null): Promise<bigint> => {
      if (!tonApi || !tonClient || !jettonWalletAddress) return 0n;
      try {
        const jettonWalletExists =
          (await tonApi.accounts.getAccount(jettonWalletAddress)).status ===
          AccountStatus.Active;
        if (!jettonWalletExists) return 0n;
        // JettonWallet is imported dynamically to avoid circular deps
        const { JettonWallet } = await import("@/lib/JettonWallet");
        const jw = await tonClient.open(JettonWallet.fromAddress(jettonWalletAddress));
        const data = await jw.getGetWalletData();
        return data.balance;
      } catch (error) {
        console.error("Error fetching jetton balance:", error);
        return 0n;
      }
    },
    [tonApi, tonClient]
  );

  const fetchBalances = useCallback(async () => {
    if (!tonApi || !walletAddress || !jettonWalletAddress_1 || !jettonWalletAddress_2 || !jettonWalletAddress_3) return;
    try {
      // TON balance
      setTonBalance(await getTonBalance(Address.parse(walletAddress)));
      // Jetton balances
      setBalance1(await getJettonWalletBalance(jettonWalletAddress_1));
      setBalance2(await getJettonWalletBalance(jettonWalletAddress_2));
      setBalance3(await getJettonWalletBalance(jettonWalletAddress_3));
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  }, [tonApi, walletAddress, jettonWalletAddress_1, jettonWalletAddress_2, jettonWalletAddress_3, getJettonWalletBalance, getTonBalance]);

  return {
    tonBalance,
    balance1,
    balance2,
    balance3,
    fetchBalances,
    getTonBalance,
    getJettonBalance,
  };
}

export function BalancesContextProvider({ children }: { children: ReactNode }) {
  const value = useProvideBalances();
  usePolling(value.fetchBalances, 10000);
  return (
    <BalancesContext.Provider value={value}>
      {children}
    </BalancesContext.Provider>
  );
}

export function useBalancesContext() {
  const context = useContext(BalancesContext);
  if (context === undefined) {
    throw new Error("useBalancesContext must be used within a BalancesContextProvider");
  }
  return context;
} 