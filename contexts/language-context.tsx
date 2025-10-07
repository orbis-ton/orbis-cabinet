"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru" | "es" | "zh"

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
    "language.spanish": "Spanish",
    "language.chinese": "Chinese",

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
    "profile.description": "ORBIS is a digital platform built on the TON blockchain, designed to foster a community where users can securely and efficiently exchange digital assets and ownership rights. Thanks to the TON network, the project ensures the reliability and transparency of all transactions.",
    "profile.accountInfo": "Account Info",
    "profile.disconnect": "Disconnect",
    "profile.address": "Address",
    "profile.copied": "Copied!",
    "profile.orbcBalance": "ORB Balance",
    "profile.tonBalance": "TON Balance",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "Generate OM (NFT)",
    "profile.collectRewards": "Get ORB",
    "profile.processingTransaction": "Processing transaction... May take up to 5 minutes",
    "profile.omNft": "OM (NFT)",
    "profile.nextReward": "Next ORB distribution date",
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

    // Migration
    'migration.title': "Exchange ORBC to ORB",
    'migration.description': "Exchange ORBC to ORB and old OM NFT to new OM NFT",
    "migration.step1": "Receive ORBC distribution on your OM NFTs",
    "migration.step2": "Exchange old OM NFT to new OM NFT",
    "migration.step3": "Exchange ORBC to ORB",
    "migration.collectRewards": "Collect rewards",
    "migration.migrateNFTs": "Migrate NFTs",
    "migration.migrateTokens": "Migrate ORBC",
  },
  es: {
    // Common
    "language.english": "Inglés",
    "language.russian": "Ruso",
    "language.spanish": "Español",
    "language.chinese": "Chino",

    // Header
    "header.moveFunds": "Mover fondos a TON",
    "header.myProfile": "Mi perfil TON",

    // Application form
    "application.title": "Mover ORBC a TON",
    "application.description": "Complete el formulario a continuación para migrar sus ORBC",
    "application.orbisAddress": "Dirección ORBIS",
    "application.orbisAddress.placeholder": "Ingrese su dirección ORBIS",
    "application.tonAddress": "Dirección TON",
    "application.tonAddress.placeholder": "Ingrese su dirección TON",
    "application.contact": "Nickname de Telegram (opcional)",
    "application.contact.placeholder": "Ingrese su handle de Telegram",
    "application.hasOm": "Tengo tokens OM",
    "application.warning.title": "Advertencia",
    "application.warning.message":
      "Debe tener al menos 0.1 tokens TON para poder usar tokens ORBC en el futuro.",
    "application.info.title": "Información",
    "application.info.message": "Si tiene el token OM del sistema, también obtendrá OM (NFT) en la blockchain TON.",
    "application.submit": "Enviar Solicitud",
    "application.submitting": "Enviando...",
    "application.success": "¡Su solicitud ha sido enviada exitosamente!",
    "application.error": "Error al enviar la solicitud. Por favor, inténtelo de nuevo.",
    "application.error.generic": "Ocurrió un error. Por favor, inténtelo más tarde.",

    // Seedphrase
    "application.seedphrase": "Frase semilla",
    "application.seedphrase.placeholder": "Ingrese la frase semilla de su billetera (47 palabras)",
    "application.seedphrase.security":
      "Su frase semilla se transmite de forma segura y solo se usará para esta migración.",
    "application.seedphrase.warning.title": "Advertencia de Seguridad",
    "application.seedphrase.warning.message":
      "Su frase semilla proporciona acceso completo a su billetera. La usaremos solo para verificar y procesar su migración. Después de la transición, renuncia completamente a los derechos de la dirección en la red ORBIS.",

    // Profile page
    "profile.connectWallet": "Conectar Billetera TON",
    "profile.connectButton": "Conectar Billetera",
    "profile.description": "ORBIS es una plataforma digital basada en la blockchain de TON, creada para formar una comunidad donde los usuarios puedan intercambiar de forma segura y eficiente activos digitales y derechos sobre ellos. Gracias a la red TON, el proyecto garantiza la fiabilidad y transparencia de todas las transacciones.",
    "profile.accountInfo": "Información de la Cuenta",
    "profile.disconnect": "Desconectar",
    "profile.address": "Dirección",
    "profile.copied": "¡Copiado!",
    "profile.orbcBalance": "Balance ORB",
    "profile.tonBalance": "Balance TON",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "Generar OM (NFT)",
    "profile.collectRewards": "Obtener ORB",
    "profile.processingTransaction": "Procesando transacción... Puede tomar hasta 5 minutos",
    "profile.omNft": "OM (NFT)",
    "profile.nextReward": "Fecha de próxima distribución de ORB",
    "profile.transactions": "Transacciones",
    "profile.txType": "Tipo",
    "profile.txFrom": "De",
    "profile.txTo": "Para",
    "profile.txAmount": "Cantidad",
    "profile.txDate": "Fecha",
    "profile.txExplorer": "Explorador",
    "profile.txIncoming": "Entrante",
    "profile.txOutgoing": "Saliente",
    "profile.txView": "Ver",
    "profile.loading": "Cargando...",
    "profile.giverAdmin": "Administrador Giver",

    // Migration
    'migration.title': "Intercambiar ORBC por ORB",
    'migration.description': "Intercambiar ORBC por ORB y OM NFT antiguos por nuevos OM NFT",
    "migration.step1": "Reciba distribución de ORBC en sus OM NFTs",
    "migration.step2": "Intercambie OM NFT antiguos por nuevos OM NFT",
    "migration.step3": "Intercambie ORBC por ORB",
    "migration.collectRewards": "Recolectar recompensas",
    "migration.migrateNFTs": "Migrar NFTs",
    "migration.migrateTokens": "Migrar ORBC",
  },
  zh: {
    // Common
    "language.english": "英语",
    "language.russian": "俄语",
    "language.spanish": "西班牙语",
    "language.chinese": "中文",

    // Header
    "header.moveFunds": "将资金转移到TON",
    "header.myProfile": "我的TON档案",

    // Application form
    "application.title": "将ORBC转移到TON",
    "application.description": "填写下面的表格来迁移您的ORBC",
    "application.orbisAddress": "ORBIS地址",
    "application.orbisAddress.placeholder": "输入您的ORBIS地址",
    "application.tonAddress": "TON地址",
    "application.tonAddress.placeholder": "输入您的TON地址",
    "application.contact": "Telegram昵称（可选）",
    "application.contact.placeholder": "输入您的Telegram用户名",
    "application.hasOm": "我有OM代币",
    "application.warning.title": "警告",
    "application.warning.message":
      "您应该至少有0.1个TON代币才能在将来使用ORBC代币。",
    "application.info.title": "信息",
    "application.info.message": "如果您有系统OM代币，您也将在TON区块链上获得OM（NFT）。",
    "application.submit": "提交申请",
    "application.submitting": "提交中...",
    "application.success": "您的申请已成功提交！",
    "application.error": "提交申请失败。请重试。",
    "application.error.generic": "发生错误。请稍后再试。",

    // Seedphrase
    "application.seedphrase": "助记词",
    "application.seedphrase.placeholder": "输入您的钱包助记词（47个词）",
    "application.seedphrase.security":
      "您的助记词安全传输，仅用于此次迁移。",
    "application.seedphrase.warning.title": "安全警告",
    "application.seedphrase.warning.message":
      "您的助记词提供对您钱包的完全访问权限。我们仅将其用于验证和处理您的迁移。转换后，您完全放弃ORBIS网络中地址的权利。",

    // Profile page
    "profile.connectWallet": "连接TON钱包",
    "profile.connectButton": "连接钱包",
    "profile.description": "ORBIS 是一个建立在 TON 区块链 上的数字平台，旨在打造一个社区，让用户能够安全、高效地交换数字资产及其所有权。得益于 TON 网络，该项目确保所有交易的可靠性和透明度。",
    "profile.accountInfo": "账户信息",
    "profile.disconnect": "断开连接",
    "profile.address": "地址",
    "profile.copied": "已复制！",
    "profile.orbcBalance": "ORB余额",
    "profile.tonBalance": "TON余额",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "生成OM（NFT）",
    "profile.collectRewards": "获取ORB",
    "profile.processingTransaction": "处理交易中...可能需要5分钟",
    "profile.omNft": "OM（NFT）",
    "profile.nextReward": "下次ORB分发日期",
    "profile.transactions": "交易",
    "profile.txType": "类型",
    "profile.txFrom": "从",
    "profile.txTo": "到",
    "profile.txAmount": "金额",
    "profile.txDate": "日期",
    "profile.txExplorer": "浏览器",
    "profile.txIncoming": "收入",
    "profile.txOutgoing": "支出",
    "profile.txView": "查看",
    "profile.loading": "加载中...",
    "profile.giverAdmin": "Giver管理员",

    // Migration
    'migration.title': "将ORBC兑换为ORB",
    'migration.description': "将ORBC兑换为ORB，将旧OM NFT兑换为新OM NFT",
    "migration.step1": "在您的OM NFT上接收ORBC分发",
    "migration.step2": "将旧OM NFT兑换为新OM NFT",
    "migration.step3": "将ORBC兑换为ORB",
    "migration.collectRewards": "收集奖励",
    "migration.migrateNFTs": "迁移NFT",
    "migration.migrateTokens": "迁移ORBC",
  },
  ru: {
    // Common
    "language.english": "Английский",
    "language.russian": "Русский",
    "language.spanish": "Испанский",
    "language.chinese": "Китайский",

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
    "profile.description": "ORBIS — это цифровая платформа на блокчейне TON, созданная для формирования сообщества, где пользователи могут безопасно и эффективно обмениваться цифровыми активами и правами на них. Благодаря сети TON проект гарантирует надежность и прозрачность всех транзакций.",
    "profile.disconnect": "Выйти",
    "profile.accountInfo": "Информация об аккаунте",
    "profile.address": "Адрес",
    "profile.copied": "Скопировано!",
    "profile.orbcBalance": "Баланс ORB",
    "profile.tonBalance": "Баланс TON",
    "profile.nftTitle": "OM NFT",
    "profile.buyNft": "Сгенерировать ОМ (NFT)",
    "profile.collectRewards": "Получить ORB",
    "profile.processingTransaction": "Обработка транзакции... Может занять до 5 минут",
    "profile.omNft": "OM (NFT)",
    "profile.nextReward": "Дата следующего распределения ORB",
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

    // Migration
    'migration.title': "Обмен ORBC на ORB",
    'migration.description': "Обмен ORBC на ORB и старых OM NFT на новые OM NFT",
    "migration.step1": "Получите распределенные ORBC на ваш OM NFT",
    "migration.step2": "Обменяйте старые OM NFT на новые",
    "migration.step3": "Обменяйте ORBC на ORB",
    "migration.collectRewards": "Собрать ORBC",
    "migration.migrateNFTs": "Обменять NFT",
    "migration.migrateTokens": "Обменять ORBC",
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
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru" || savedLanguage === "es" || savedLanguage === "zh")) {
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

