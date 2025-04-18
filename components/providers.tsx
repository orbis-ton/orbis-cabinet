"use client"

import React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { TonConnectUIProvider } from '@tonconnect/ui-react'


const LOCAL = process.env.NODE_ENV === 'development'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TonConnectUIProvider manifestUrl={LOCAL ? "https://74c5-2001-871-260-8345-ddb7-e6e0-6f23-a881.ngrok-free.app/tonconnect-manifest.json" : "https://user.orbis.money/tonconnect-manifest.json"}>
        {children}
      </TonConnectUIProvider>
    </LanguageProvider>
  )
} 