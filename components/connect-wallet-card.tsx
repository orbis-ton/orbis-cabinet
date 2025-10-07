"use client";

import { useLanguage } from "@/contexts/language-context";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConnectWalletCard() {
  const { t } = useLanguage();
  const [tonConnectUI] = useTonConnectUI();
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium text-gray-800">
            {t("profile.connectWallet")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button
            onClick={() => tonConnectUI.openModal()}
            className="bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {t("profile.connectButton")}
          </Button>
          <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
            {t("profile.description")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 