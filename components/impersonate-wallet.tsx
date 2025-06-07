import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWalletContext } from "@/contexts/wallet-context";

export function ImpersonateWallet() {
  const { impersonateWalletAddress, setImpersonateWalletAddress } = useWalletContext();
  const [input, setInput] = useState(impersonateWalletAddress || "");

  if (!setImpersonateWalletAddress) return null;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Impersonate Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter wallet address to impersonate"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setImpersonateWalletAddress(input)}
              disabled={!input}
              variant="secondary"
            >
              Set
            </Button>
            <Button
              onClick={() => {
                setImpersonateWalletAddress(null);
                setInput("");
              }}
              variant="outline"
              disabled={!impersonateWalletAddress}
            >
              Clear
            </Button>
          </div>
          {impersonateWalletAddress && (
            <div className="text-xs text-muted-foreground mt-2">
              Currently impersonating: <span className="font-mono">{impersonateWalletAddress}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 