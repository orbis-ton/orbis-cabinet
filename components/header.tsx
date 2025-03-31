"use client"

import Image from "next/image"
import Link from "next/link"
// import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Globe } from "lucide-react"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  // const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
        <div className="flex justify-between items-center h-full">
          {/* Mobile layout */}
          <div className="md:hidden flex items-center flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/orbis-logo.png"
                alt="ORBIS Logo"
                width={72}
                height={26}
                priority
              />
              {/* <svg 
                width="24" 
                height="16" 
                viewBox="0 0 40 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
              >
                <path 
                  d="M0 12H36M36 12L25 1M36 12L25 23" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
              </svg>
              <Image
                src="/ton_symbol.png"
                alt="TON Symbol"
                width={40}
                height={40}
                priority
              /> */}
            </Link>
          </div>

          {/* Desktop layout - absolute center */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center gap-6">
              <Image
                src="/orbis-logo.png"
                alt="ORBIS Logo"
                width={90}
                height={32}
                priority
              />
              {/* <svg 
                width="40" 
                height="24" 
                viewBox="0 0 40 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
              >
                <path 
                  d="M0 12H36M36 12L25 1M36 12L25 23" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
              </svg>
              <Image
                src="/ton_symbol.png"
                alt="TON Symbol"
                width={56}
                height={56}
                priority
              /> */}
            </Link>
          </div>

          {/* Language switcher - same for both layouts */}
          <div className="flex items-center ml-auto pr-4 md:pr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-2 flex items-center gap-2 hover:bg-gray-100">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{language === "en" ? "EN" : "RU"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>{t("language.english")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ru")}>{t("language.russian")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
