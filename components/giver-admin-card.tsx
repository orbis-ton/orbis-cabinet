"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OMGiver } from "@/lib/OMGiver";
import { formatDate } from "@/lib/utils";
import { usePolling } from "@/hooks/polling";
import { Address, fromNano, TonClient } from "@ton/ton";
import { AccountStatus, TonApiClient } from "@ton-api/client";
import { useWalletContext } from "@/contexts/wallet-context";

interface GiverAdminCardProps {
  calculateDistribution: (
    setIsCalculatingDistribution: (isCalculating: boolean) => void,
    setCalculateDistributionError: (error: string | null) => void
  ) => void;
}

export function GiverAdminCard({
  calculateDistribution
}: GiverAdminCardProps) {
  const { t } = useLanguage();

  const { tonClient, tonApi, jettonMasterAddress, walletAddress, omGiverAddress } =
    useWalletContext();

  const [isCalculatingDistribution, setIsCalculatingDistribution] =
    useState(false);
  const [calculateDistributionError, setCalculateDistributionError] = useState<
    string | null
  >(null);

  const [lastDistributionDate, setLastDistributionDate] = useState<Date | null>(
    null
  );
  const [distributionData, setDistributionData] = useState<
    { nftId: string; amount: string }[]
  >([]);
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceToDistribute, setBalanceToDistribute] = useState<string | null>(
    null
  );
  const [realBalance, setRealBalance] = useState<string | null>(null);
  const [gas, setGas] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGiverData = useCallback(async () => {
    if (!tonClient || !tonApi) return;

    setIsLoading(true);
    setError(null);
    try {
      const giver = tonClient.open(OMGiver.fromAddress(omGiverAddress));
      const giverData = await giver.getGetGiverData();
      setBalance(fromNano(giverData.balance.toString()));
      setBalanceToDistribute(fromNano(giverData.balanceFree.toString()));

      const jettonWalletAddress = Address.parse(
        (
          await tonApi.blockchain.execGetMethodForBlockchainAccount(
            jettonMasterAddress,
            "get_wallet_address",
            { args: [giver.address.toRawString()] }
          )
        ).decoded.jetton_wallet_address
      );
      const jettonWalletExists =
        (await tonApi.accounts.getAccount(jettonWalletAddress)).status ===
        AccountStatus.Active;
      const balanceORBC = jettonWalletExists
        ? await tonApi.accounts.getAccountJettonBalance(
            giver.address,
            jettonMasterAddress
          )
        : { balance: 0n };
      setRealBalance(fromNano(balanceORBC.balance.toString()));

      const gas = await tonClient.getBalance(giver.address);
      setGas(fromNano(gas.toString()));
      // Set last distribution date
      const lastDistTime = giverData.lastRewardDistribution;
      setLastDistributionDate(
        lastDistTime === 0n ? null : new Date(Number(lastDistTime) * 1000)
      );
      // Convert to-distribute dictionary to array of objects
      const distributeData: { nftId: string; amount: string }[] = [];
      if (giverData.toDistribute) {
        for (const key of giverData.toDistribute.keys()) {
          const value = giverData.toDistribute.get(key);
          distributeData.push({
            nftId: key.toString(),
            amount: value ? value.toString() : "0",
          });
        }
      }

      setDistributionData(distributeData);
    } catch (err) {
      console.error("Error fetching giver data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [tonClient, omGiverAddress, jettonMasterAddress, walletAddress]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchGiverData();
  }, [tonClient, omGiverAddress, jettonMasterAddress, walletAddress]);

  usePolling(fetchGiverData, 10000);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("profile.giverAdmin") || "Giver Admin"}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Contract State</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm text-muted-foreground">
                  Last Distribution:
                </div>
                <div>
                  {lastDistributionDate
                    ? formatDate(lastDistributionDate)
                    : "Never"}
                </div>
                <div className="text-sm text-muted-foreground">Balance:</div>
                <div>{balance}</div>
                <div className="text-sm text-muted-foreground">
                  Balance to distribute:
                </div>
                <div>{balanceToDistribute}</div>
                <div className="text-sm text-muted-foreground">
                  Real balance:
                </div>
                <div>{realBalance}</div>
                <div className="text-sm text-muted-foreground">Gas:</div>
                <div>{gas}</div>
              </div>

              <Button
                onClick={() =>
                  calculateDistribution(
                    setIsCalculatingDistribution,
                    setCalculateDistributionError
                  )
                }
                disabled={isCalculatingDistribution}
                className="bg-purple-600 hover:bg-purple-700 mb-4"
              >
                {isCalculatingDistribution ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Calculate Distribution"
                )}
              </Button>

              {calculateDistributionError && (
                <p className="text-red-500 text-sm mb-4">
                  {calculateDistributionError}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Distribution Data</h3>
              {distributionData.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted">
                          <TableHead className="py-2">NFT ID</TableHead>
                          <TableHead className="py-2">
                            ORBC to Distribute
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distributionData.map((item) => (
                          <TableRow
                            key={item.nftId}
                            className="h-8 hover:bg-muted/50"
                          >
                            <TableCell className="py-1">{item.nftId}</TableCell>
                            <TableCell className="py-1">
                              {item.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground py-4 text-center border rounded-md">
                  No distribution data available
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
