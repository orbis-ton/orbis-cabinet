import { useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { AccountStatus } from "@ton-api/client";
import { usePolling } from "./polling";
import { useWalletContext } from "../contexts/wallet-context";

export function useBalances() {
  const { walletAddress, tonApi, jettonMasterAddress } = useWalletContext();
  
  const [balance, setBalance] = useState<bigint | null>(null);
  const [balanceORBC, setBalanceORBC] = useState<bigint | null>(null);

  useEffect(() => {
    setBalance(null);
    setBalanceORBC(null);
  }, [walletAddress]);

  const fetchBalances = useCallback(async () => {
    if (!tonApi || !walletAddress) return;
    try {
      const addressInfo = await tonApi.accounts.getAccount(
        Address.parse(walletAddress)
      );
      setBalance(addressInfo.balance);
      const balanceORBC_ = await fetchORBCBalance(walletAddress);
      setBalanceORBC(balanceORBC_);
      console.log("Balances fetched");
    } catch (error) {
      console.error("Error fetching balances:", error);
      setBalance(null);
      setBalanceORBC(null);
    }
  }, [tonApi, walletAddress]);

  const fetchORBCBalance = useCallback(async (walletAddress: string): Promise<bigint> => {
    if (!tonApi) return 0n;
    try {
      const jettonWalletAddress = Address.parse(
        (
          await tonApi.blockchain.execGetMethodForBlockchainAccount(
            jettonMasterAddress,
            "get_wallet_address",
            { args: [walletAddress] }
          )
        ).decoded.jetton_wallet_address
      );
      const jettonWalletExists =
        (await tonApi.accounts.getAccount(jettonWalletAddress)).status ===
        AccountStatus.Active;
      const balanceORBC = jettonWalletExists
        ? await tonApi.accounts.getAccountJettonBalance(
            Address.parse(walletAddress),
            jettonMasterAddress
          )
        : { balance: 0n };
      return balanceORBC.balance;
    } catch (error) {
      console.error("Error fetching ORBC balance:", error);
      return 0n;
    }
  }, [tonApi, jettonMasterAddress]);

  // Poll for balance updates every 10 seconds
  usePolling(fetchBalances, 10000);

  return {
    balance,
    balanceORBC,
    fetchBalances
  };
} 