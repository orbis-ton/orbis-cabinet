import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ORBIS Token Migration Tool",
  description: "Migrate ORBC tokens to TON blockchain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col items-center p-4 pt-28 bg-white flex-grow">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
