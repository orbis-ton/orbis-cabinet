"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru"

type TranslationKey = keyof typeof translations.en

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const translations = {
  en: {
    // Common
    "language.english": "English",
    "language.russian": "Russian",

    // Header
    "header.moveFunds": "Move funds to TON",
    "header.myProfile": "My TON profile",

    // Application form
    "application.title": "Move ORBC to TON",
    "application.description": "Fill in the form below to migrate your ORBC",
    "application.orbisAddress": "ORBIS Address",
    "application.orbisAddress.placeholder": "Enter your ORBIS address",
    "application.tonAddress": "TON Address",
    "application.tonAddress.placeholder": "Enter your TON address",
    "application.contact": "Telegram nickname (optional)",
    "application.contact.placeholder": "Enter your Telegram handle",
    "application.hasOm": "I have OM tokens",
    "application.warning.title": "Warning",
    "application.warning.message":
      "You should have at least 0.1 TON tokens to be able to use ORBC tokens in the future.",
    "application.info.title": "Information",
    "application.info.message": "If you have the system OM token, you will also get OM (NFT) on the TON blockchain.",
    "application.submit": "Submit Application",
    "application.submitting": "Submitting...",
    "application.success": "Your application has been submitted successfully!",
    "application.error": "Failed to submit application. Please try again.",
    "application.error.generic": "An error occurred. Please try again later.",

    // Seedphrase
    "application.seedphrase": "Seedphrase",
    "application.seedphrase.placeholder": "Enter your wallet seedphrase (47 words)",
    "application.seedphrase.security":
      "Your seedphrase is transmitted securely and will only be used for this migration.",
    "application.seedphrase.warning.title": "Security Warning",
    "application.seedphrase.warning.message":
      "Your seedphrase provides full access to your wallet. We will use it only to verify and process your migration. After the transition, you completely give up rights to the address in the ORBIS network.",

    // Profile page
    // "profile.title": "My TON Profile",
    "profile.connectWallet": "Connect TON Wallet",
    "profile.connectButton": "Connect Wallet",
    "profile.accountInfo": "Account Info",
    "profile.disconnect": "Disconnect",
    "profile.address": "Address",
    "profile.copied": "Copied!",
    "profile.orbcBalance": "ORBC Balance",
    "profile.tonBalance": "TON Balance",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "Generate OM (NFT)",
    "profile.collectRewards": "Get ORBC",
    "profile.processingTransaction": "Processing transaction... May take up to 5 minutes",
    "profile.omNft": "OM (NFT)",
    "profile.nextReward": "Next ORBC distribution date",
    "profile.transactions": "Transactions",
    "profile.txType": "Type",
    "profile.txFrom": "From",
    "profile.txTo": "To",
    "profile.txAmount": "Amount",
    "profile.txDate": "Date",
    "profile.txExplorer": "Explorer",
    "profile.txIncoming": "Incoming",
    "profile.txOutgoing": "Outgoing",
    "profile.txView": "View",
    "profile.loading": "Loading...",
    "profile.giverAdmin": "Giver Admin",
  },
  ru: {
    // Common
    "language.english": "Английский",
    "language.russian": "Русский",

    // Header
    "header.moveFunds": "Перевести в TON",
    "header.myProfile": "Мой TON профиль",

    // Application form
    "application.title": "Перевод ORBC в сеть TON",
    "application.description": "Заполните форму ниже для миграции ваших ORBC",
    "application.orbisAddress": "Адрес ORBIS",
    "application.orbisAddress.placeholder": "Введите ваш адрес ORBIS",
    "application.tonAddress": "Адрес TON",
    "application.tonAddress.placeholder": "Введите ваш адрес TON",
    "application.contact": "Никнейм в Telegram (необязательно)",
    "application.contact.placeholder": "Введите ваш никнейм в Telegram",
    "application.hasOm": "У меня есть токены OM",
    "application.warning.title": "Предупреждение",
    "application.warning.message":
      "У вас должно быть не менее 0.1 TON токенов, чтобы иметь возможность использовать токены ORBC в будущем.",
    "application.info.title": "Информация",
    "application.info.message": "Если у вас есть системный токен ОМ, вы получите OM (NFT) в сети TON.",
    "application.submit": "Отправить заявку",
    "application.submitting": "Отправка...",
    "application.success": "Ваша заявка успешно отправлена!",
    "application.error": "Не удалось отправить заявку. Пожалуйста, попробуйте снова.",
    "application.error.generic": "Произошла ошибка. Пожалуйста, попробуйте позже.",

    // Seedphrase
    "application.seedphrase": "Сид-фраза",
    "application.seedphrase.placeholder": "Введите сид-фразу вашего кошелька (47 слов)",
    "application.seedphrase.security":
      "Ваша сид-фраза передается безопасно и будет использована только для этой миграции.",
    "application.seedphrase.warning.title": "Предупреждение безопасности",
    "application.seedphrase.warning.message":
      "Ваша сид-фраза предоставляет полный доступ к вашему кошельку. Мы будем использовать её только для проверки и обработки вашей миграции. После перехода вы полностью отказываетесь от прав на адрес в сети ORBIS",

    // Profile page
    // "profile.title": "Мой TON Профиль",
    "profile.connectWallet": "Подключить TON кошелек",
    "profile.connectButton": "Подключить кошелек",
    "profile.disconnect": "Выйти",
    "profile.accountInfo": "Информация об аккаунте",
    "profile.address": "Адрес",
    "profile.copied": "Скопировано!",
    "profile.orbcBalance": "Баланс ORBC",
    "profile.tonBalance": "Баланс TON",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "Сгенерировать ОМ (NFT)",
    "profile.collectRewards": "Получить ORBC",
    "profile.processingTransaction": "Обработка транзакции... Может занять до 5 минут",
    "profile.omNft": "OM (NFT)",
    "profile.nextReward": "Дата следующего распределения ORBC",
    "profile.transactions": "Транзакции",
    "profile.txType": "Тип",
    "profile.txFrom": "От",
    "profile.txTo": "Кому",
    "profile.txAmount": "Сумма",
    "profile.txDate": "Дата",
    "profile.txExplorer": "Обозреватель",
    "profile.txIncoming": "Получение",
    "profile.txOutgoing": "Отправка",
    "profile.txView": "Просмотр",
    "profile.loading": "Загрузка...",
    "profile.giverAdmin": "Giver Admin",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Make sure the useEffect hook runs on the client side only
    // Load language preference from localStorage if available
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage)
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

