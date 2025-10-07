"use client";

import { useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";

import { ConnectWalletCard } from "@/components/connect-wallet-card";
import { AccountCard } from "@/components/account-card";
import { NftCard } from "@/components/nft-card";
import { GiverAdminCard } from "@/components/giver-admin-card";
import { Transactions } from "@/components/transactions";
import { useMyNfts } from "@/hooks/use-nfts";
import { useAdminActions } from "@/hooks/use-admin-actions";
import {
  WalletContextProvider,
  useWalletContext,
} from "@/contexts/wallet-context";
import { BalancesContextProvider, useBalancesContext } from "@/contexts/balances-context";
import { ImpersonateWallet } from "@/components/impersonate-wallet";
import { OrbDataContextProvider } from "@/contexts/orb-data-context";
import { NewTokenMigration } from "@/components/new-token-migration";

function ProfilePageContent() {
  // Context hooks
  const { isConnected, isAdmin } = useWalletContext();
  const { getJettonBalance } = useBalancesContext();
  const { calculateDistribution } = useAdminActions(getJettonBalance);

  if (!isConnected) {
    return <ConnectWalletCard />;
  }

  // Show NewTokenMigration when hash is #exchange
  // if (hash === "#exchange") {
  //   return (
  //     <div className="w-full max-w-2xl mx-auto">
  //       <NewTokenMigration />
  //     </div>
  //   );
  // }
  return (
    
      
      <OrbDataContextProvider>
    <div className="w-full max-w-6xl">
      {/* Uncomment for impersonation functionality in development */}
      {/* <ImpersonateWallet /> */}
      {isAdmin && (
        <GiverAdminCard calculateDistribution={calculateDistribution} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AccountCard />
        <NftCard />
      </div>

      {/* Transactions Block */}
      <Transactions />
    </div>
    
      </OrbDataContextProvider>
    
  );
}

export default function ProfilePage() {
  return (
    <WalletContextProvider>
      <BalancesContextProvider>
        <ProfilePageContent />
      </BalancesContextProvider>
    </WalletContextProvider>
        
      
  );
}
