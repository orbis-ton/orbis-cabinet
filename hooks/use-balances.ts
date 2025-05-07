import { useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { AccountStatus } from "@ton-api/client";
import { usePolling } from "./polling";
import { useWalletContext } from "../contexts/wallet-context";
import {JettonWallet} from '@/lib/JettonWallet'

export function useBalances() {
  const { walletAddress, tonApi, jettonMasterAddress, jettonMasterAddress_old, tonClient } = useWalletContext();
  
  const [balance, setBalance] = useState<bigint | null>(null);
  const [balanceORBC, setBalanceORBC] = useState<bigint | null>(null);
  const [balanceORBC_old, setBalanceORBC_old] = useState<bigint | null>(null);

  useEffect(() => {
    setBalance(null);
    setBalanceORBC(null);
    setBalanceORBC_old(null);
  }, [walletAddress]);

  const fetchBalances = useCallback(async () => {
    if (!tonApi || !walletAddress || !tonClient) return;
    try {
      const addressInfo = await tonApi.accounts.getAccount(
        Address.parse(walletAddress)
      );
      setBalance(addressInfo.balance);

      const balanceORBC_ = await fetchORBCBalance(walletAddress, jettonMasterAddress);
      setBalanceORBC(balanceORBC_);
      
      const balanceORBC_old_ = await fetchORBCBalance(walletAddress, jettonMasterAddress_old);
      setBalanceORBC_old(balanceORBC_old_);

      console.log("Balances fetched");
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  }, [tonApi, walletAddress]);

  const fetchORBCBalance = useCallback(async (walletAddress: string, jettonMasterAddress_: Address): Promise<bigint> => {
    if (!tonApi || !tonClient) return 0n;
    try {
      const jettonWalletAddress = Address.parse(
        (
          await tonApi.blockchain.execGetMethodForBlockchainAccount(
            jettonMasterAddress_,
            "get_wallet_address",
            { args: [walletAddress] }
          )
        ).decoded.jetton_wallet_address
      );

      const jettonWalletExists =
        (await tonApi.accounts.getAccount(jettonWalletAddress)).status ===
        AccountStatus.Active;
      const jw = await tonClient.open(JettonWallet.fromAddress(jettonWalletAddress))
      const balanceORBC = jettonWalletExists
        ? await jw.getGetWalletData()
        : { balance: 0n };
      return balanceORBC.balance;
    } catch (error) {
      console.error("Error fetching ORBC balance:", error);
      return 0n;
    }
  }, [tonApi, jettonMasterAddress]);

  return {
    balance,
    balanceORBC,
    balanceORBC_old,
    fetchBalances,
    fetchORBCBalance
  };
} 