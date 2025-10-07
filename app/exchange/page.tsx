"use client";

import { NewTokenMigration } from "@/components/new-token-migration";
import { useWalletContext, WalletContextProvider } from "@/contexts/wallet-context";
import { BalancesContextProvider } from "@/contexts/balances-context";
import { ImpersonateWallet } from "@/components/impersonate-wallet";
import { OrbDataContextProvider } from "@/contexts/orb-data-context";
import { ConnectWalletCard } from "@/components/connect-wallet-card";

function ExchangePageContent() {
  const { isConnected } = useWalletContext();
  if (!isConnected) {
    return <ConnectWalletCard />;
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* <ImpersonateWallet /> */}
      <NewTokenMigration />
    </div>
  );
}

export default function ExchangePage() {
  return (
    <WalletContextProvider>
      <OrbDataContextProvider>
      <BalancesContextProvider>
        <ExchangePageContent />
      </BalancesContextProvider>
      </OrbDataContextProvider>
    </WalletContextProvider>
  );
} 