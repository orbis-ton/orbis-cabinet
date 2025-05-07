"use client"

import React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { TonConnectUIProvider } from '@tonconnect/ui-react'


const LOCAL = process.env.NODE_ENV === 'development'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TonConnectUIProvider manifestUrl={"https://user.orbis.money/tonconnect-manifest.json"}>
        {children}
      </TonConnectUIProvider>
    </LanguageProvider>
  )
} 