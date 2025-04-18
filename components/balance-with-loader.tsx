"use client";

import { Loader2 } from "lucide-react";
import { fromNano } from "@ton/core";

interface BalanceWithLoaderProps {
  balance: bigint | null;
  symbol: string;
}

export function BalanceWithLoader({ balance, symbol }: BalanceWithLoaderProps) {
  return balance === null ? (
    <div className="flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
      <span className="text-gray-400">Loading...</span>
    </div>
  ) : (
    <div className="font-medium">
      {symbol === "TON" ? fromNano(balance) : fromNano(balance)} {symbol}
    </div>
  );
} 