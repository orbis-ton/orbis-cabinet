"use client";

import { useLanguage } from "@/contexts/language-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyNftButtonProps {
  isBuyNftPending: boolean;
  buyNftError: string | null;
  buyNft: (
    setIsBuyNftPending: (isBuyNftPending: boolean) => void,
    setBuyNftError: (buyNftError: string | null) => void
  ) => void;
  setIsBuyNftPending: (isBuyNftPending: boolean) => void;
  setBuyNftError: (buyNftError: string | null) => void;
}

export function BuyNftButton({
  isBuyNftPending,
  buyNftError,
  buyNft,
  setIsBuyNftPending,
  setBuyNftError,
}: BuyNftButtonProps) {
  const { t } = useLanguage();
  return isBuyNftPending ? (
    <div className="flex flex-col items-center py-8">
      <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
      <p>{t("profile.processingTransaction")}</p>
    </div>
  ) : (
    <>
      <Button
        onClick={() => buyNft(setIsBuyNftPending, setBuyNftError)}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("profile.buyNft")}
      </Button>
      {buyNftError && (
        <p className="text-red-500 text-sm mt-2">{buyNftError}</p>
      )}
    </>
  );
} 