import { useCallback, useState, useEffect } from "react";
import { Address } from "@ton/ton";
import { Action } from "@ton-api/client";
import { filterEvents } from "@/lib/utils";
import { usePolling } from "./polling";
import { useWalletContext } from "../contexts/wallet-context";

export function useTransactions() {
  const { walletAddress, tonApi, jettonMasterAddress } = useWalletContext();
  
  const [actions, setActions] = useState<
    | (Action & {
        actionData?: any;
        timestamp?: number;
        explorerLink?: string;
        lt?: bigint;
      })[]
    | null
  >(null);

  useEffect(() => {
    setActions(null);
  }, [walletAddress]);

  const fetchTransactions = useCallback(async (allNftAddresses: Address[] = []) => {
    if (!tonApi || !walletAddress) return;
    try {
      const events = await tonApi.accounts.getAccountEvents(
        Address.parse(walletAddress),
        { limit: 20 }
      );
      console.log("Events:", events.events);

      const eventsFiltered = filterEvents(
        events.events,
        jettonMasterAddress,
        allNftAddresses
      );

      console.log("Events filtered:", eventsFiltered);
      setActions(eventsFiltered);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setActions([]);
    }
  }, [tonApi, walletAddress, jettonMasterAddress]);

  // Poll for transaction updates every 30 seconds
  usePolling(() => fetchTransactions([]), 30000);

  return {
    actions,
    fetchTransactions,
  };
} 