"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceWithLoader } from "./balance-with-loader";
import { truncateAddress } from "@/lib/utils";

interface AccountCardProps {
  walletAddress: string;
  balance: bigint | null;
  balanceORBC: bigint | null;
}

export function AccountCard({ walletAddress, balance, balanceORBC }: AccountCardProps) {
  const { t } = useLanguage();
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
          <BalanceWithLoader balance={balanceORBC} symbol="ORBC" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("profile.tonBalance")}
          </div>
          <BalanceWithLoader balance={balance} symbol="TON" />
        </div>
      </CardContent>
    </Card>
  );
} 