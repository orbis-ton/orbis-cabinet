"use client";

import { NewTokenMigration } from "@/components/new-token-migration";
import { WalletContextProvider } from "@/contexts/wallet-context";
import { BalancesContextProvider } from "@/contexts/balances-context";
import { ImpersonateWallet } from "@/components/impersonate-wallet";

function ExchangePageContent() {

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ImpersonateWallet />
      <NewTokenMigration />
    </div>
  );
}

export default function ExchangePage() {
  return (
    <WalletContextProvider>
      <BalancesContextProvider>
        <ExchangePageContent />
      </BalancesContextProvider>
    </WalletContextProvider>
  );
} 