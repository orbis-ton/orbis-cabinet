"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Copy, ExternalLink, Loader2 } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock transaction data
const mockTransactions = [
  {
    id: "tx1",
    type: "incoming",
    from: "UQCJCs4PeNyEYvWRnGmfV8x_3XFt_JtzWZaGP-VSV5bdXVTq",
    to: "UQDrGALUcr_Lm5HJhAhZ5Jw_2PgY_5hB_TBGm-HxNq9vf8wW",
    amount: 5000,
    date: "2023-05-15T10:30:00Z",
    explorerLink: "https://tonviewer.com/transaction/123456",
  },
  {
    id: "tx2",
    type: "outgoing",
    from: "UQDrGALUcr_Lm5HJhAhZ5Jw_2PgY_5hB_TBGm-HxNq9vf8wW",
    to: "UQBn7-bQVPKcFf0x5R3BYaBWwTlDjJ0RzQWGzx1BZ7aXZtlj",
    amount: 1200,
    date: "2023-05-14T14:20:00Z",
    explorerLink: "https://tonviewer.com/transaction/789012",
  },
  {
    id: "tx3",
    type: "incoming",
    from: "UQCdFe3gHiLs7pRtUvWxYzAb9CdFe3gHiLs7pRtU",
    to: "UQDrGALUcr_Lm5HJhAhZ5Jw_2PgY_5hB_TBGm-HxNq9vf8wW",
    amount: 7800,
    date: "2023-05-13T09:15:00Z",
    explorerLink: "https://tonviewer.com/transaction/345678",
  },
]

export default function ProfilePage() {
  const { t } = useLanguage()
  const [isConnected, setIsConnected] = useState(false)
  const [isBuyingNft, setIsBuyingNft] = useState(false)
  const [hasNft, setHasNft] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Mock wallet address
  const walletAddress = "UQDrGALUcr_Lm5HJhAhZ5Jw_2PgY_5hB_TBGm-HxNq9vf8wW"

  // Connect wallet function
  const connectWallet = () => {
    setIsConnected(true)
  }

  // Buy NFT function
  const buyNft = () => {
    setIsBuyingNft(true)

    // Simulate transaction processing
    setTimeout(() => {
      setIsBuyingNft(false)
      setHasNft(true)
    }, 10000) // 10 seconds
  }

  // Copy address function
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Calculate next reward date (3 months from now)
  const nextRewardDate = new Date()
  nextRewardDate.setMonth(nextRewardDate.getMonth() + 3)

  if (!isConnected) {
    return (
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium text-gray-800">{t("profile.connectWallet")}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700" size="lg">
              {t("profile.connectButton")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Account Info Block */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.accountInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t("profile.address")}</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm truncate max-w-[200px]">{walletAddress}</span>
                <Button variant="ghost" size="icon" onClick={copyWalletAddress} className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                {copySuccess && <span className="text-xs text-green-600">{t("profile.copied")}</span>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t("profile.orbcBalance")}</div>
              <div className="font-medium">20,000 ORBC</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t("profile.tonBalance")}</div>
              <div className="font-medium">2.5 TON</div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Block */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.nftTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            {!hasNft ? (
              isBuyingNft ? (
                <div className="flex flex-col items-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
                  <p>{t("profile.processingTransaction")}</p>
                </div>
              ) : (
                <Button onClick={buyNft} className="bg-purple-600 hover:bg-purple-700" size="lg">
                  {t("profile.buyNft")}
                </Button>
              )
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4 rounded-lg overflow-hidden border">
                  <Image src="/placeholder.svg?height=160&width=160" alt="OM NFT" width={160} height={160} />
                </div>
                <div className="text-center mb-4">
                  {/* <h3 className="font-medium">{t("profile.omNft")}</h3> */}
                  {/* <p className="text-sm text-muted-foreground truncate max-w-[250px]">{walletAddress}</p> */}
                  <p className="font-medium mt-2">1 OM (NFT)</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{t("profile.nextReward")}:</span> {nextRewardDate.toLocaleDateString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions Block */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.transactions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("profile.txType")}</TableHead>
                  <TableHead>{t("profile.txFrom")}</TableHead>
                  <TableHead>{t("profile.txTo")}</TableHead>
                  <TableHead>{t("profile.txAmount")}</TableHead>
                  <TableHead>{t("profile.txDate")}</TableHead>
                  <TableHead>{t("profile.txExplorer")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          tx.type === "incoming" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {tx.type === "incoming" ? t("profile.txIncoming") : t("profile.txOutgoing")}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs truncate max-w-[150px]">{tx.from}</TableCell>
                    <TableCell className="font-mono text-xs truncate max-w-[150px]">{tx.to}</TableCell>
                    <TableCell>{tx.amount.toLocaleString()} ORBC</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <a
                        href={tx.explorerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {t("profile.txView")}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

