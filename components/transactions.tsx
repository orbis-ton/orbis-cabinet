"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Address } from "@ton/ton";
import { fromNano } from "@ton/core";
import { Action } from "@ton-api/client";
import { truncateAddress } from "@/lib/utils";
import { useTransactions } from "@/hooks/use-transactions";
import { useWalletContext } from "@/contexts/wallet-context";

export function Transactions() {
  const { t } = useLanguage();
  const { walletAddress } = useWalletContext();
  const { actions } = useTransactions();
  
  const [copiedAddress, setCopiedAddress] = useState<{
    address: string;
    rowId: number;
  } | null>(null);

  const copyAddress = useCallback((address: string, rowId: number) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress({ address, rowId });
    setTimeout(() => setCopiedAddress(null), 2000);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("profile.transactions")}</CardTitle>
      </CardHeader>
      <CardContent>
        {actions === null ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
            <p>{t("profile.loading")}</p>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">
                    {t("profile.txType")}
                  </TableHead>
                  <TableHead className="w-[280px]">
                    {t("profile.txFrom")}
                  </TableHead>
                  <TableHead className="w-[280px]">
                    {t("profile.txTo")}
                  </TableHead>
                  <TableHead className="w-[100px]">
                    {t("profile.txAmount")}
                  </TableHead>
                  <TableHead className="w-[100px]">
                    {t("profile.txDate")}
                  </TableHead>
                  <TableHead className="w-[100px]">
                    {t("profile.txExplorer")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {walletAddress &&
                  actions.map((a, i) => {
                    const incoming =
                      a.type !== "SmartContractExec" &&
                      a.actionData!.recipient!.address.equals(
                        Address.parse(walletAddress)
                      );
                    const senderAddr =
                      a.type === "SmartContractExec"
                        ? a.actionData?.executor.address
                        : a.actionData?.sender.address;
                    const recipientAddr =
                      a.type === "SmartContractExec"
                        ? a.actionData?.contract.address
                        : a.actionData?.recipient.address;
                    return (
                      <TableRow
                        key={i}
                        className={`${
                          incoming
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            {a.type === "TonTransfer"
                              ? "TON "
                              : a.type === "SmartContractExec"
                              ? "TON "
                              : a.type === "JettonTransfer"
                              ? "ORB "
                              : a.type === "NftItemTransfer"
                              ? "OM "
                              : ""}{" "}
                            {incoming
                              ? t("profile.txIncoming")
                              : t("profile.txOutgoing")}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[150px]">
                          <div className="flex items-center space-x-1">
                            <span className="truncate">
                              {truncateAddress(
                                senderAddr.toString({ bounceable: false })
                              )}
                            </span>
                            <button
                              onClick={() =>
                                copyAddress(
                                  senderAddr.toString({ bounceable: false }),
                                  i
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            {copiedAddress?.address ===
                              senderAddr.toString({ bounceable: false }) &&
                              copiedAddress?.rowId === i && (
                                <span className="text-xs text-green-600">
                                  {t("profile.copied")}
                                </span>
                              )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[150px]">
                          <div className="flex items-center space-x-1">
                            <span className="truncate">
                              {truncateAddress(
                                recipientAddr.toString({ bounceable: false })
                              )}
                            </span>
                            <button
                              onClick={() =>
                                copyAddress(
                                  recipientAddr.toString({
                                    bounceable: false,
                                  }),
                                  i
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            {copiedAddress?.address ===
                              recipientAddr.toString({ bounceable: false }) &&
                              copiedAddress?.rowId === i && (
                                <span className="text-xs text-green-600">
                                  {t("profile.copied")}
                                </span>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {a.type === "NftItemTransfer"
                            ? "1"
                            : a.type === "SmartContractExec"
                            ? fromNano(a.actionData?.tonAttached)
                            : a.type === "TonTransfer"
                            ? fromNano(a.actionData?.amount)
                            : fromNano(a.actionData?.amount)}
                          {a.type === "JettonTransfer"
                            ? " ORB"
                            : a.type === "TonTransfer"
                            ? " TON"
                            : a.type === "SmartContractExec"
                            ? " TON"
                            : " OM"}
                        </TableCell>
                        <TableCell>
                          {new Date(a.timestamp! * 1000).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <a
                            href={a.explorerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {t("profile.txView")}
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 