"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceWithLoader } from "./balance-with-loader";
import { truncateAddress } from "@/lib/utils";
import { useBalancesContext } from "@/contexts/balances-context";
import { useWalletContext } from "@/contexts/wallet-context";


export function AccountCard({ onlyAddress }: { onlyAddress?: boolean }) {
  const { t } = useLanguage();
  const { walletAddress } = useWalletContext();
  const { tonBalance, balance3 } = useBalancesContext();
  const [tonConnectUI] = useTonConnectUI();
  const [copySuccess, setCopySuccess] = useState(false);

  const disconnectWallet = async () => {
    await tonConnectUI.disconnect();
  };
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  if (onlyAddress) {
    return (

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm truncate max-w-[200px]">
                {truncateAddress(walletAddress)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyWalletAddress}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={disconnectWallet}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Button>
          </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t("profile.accountInfo")}</CardTitle>
          <Button
            onClick={disconnectWallet}
            className="bg-gray-600 hover:bg-gray-700"
            size="sm"
          >
            {t("profile.disconnect")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("profile.address")}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm truncate max-w-[200px]">
              {truncateAddress(walletAddress)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyWalletAddress}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            {copySuccess && (
              <span className="text-xs text-green-600">
                {t("profile.copied")}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("profile.orbcBalance")}
          </div>
          <BalanceWithLoader balance={balance3} symbol="ORB" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("profile.tonBalance")}
          </div>
          <BalanceWithLoader balance={tonBalance} symbol="TON" />
        </div>
      </CardContent>
    </Card>
  );
} 