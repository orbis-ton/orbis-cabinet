import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Address, SenderArguments, TonClient, type Sender } from "@ton/ton";
import { TonApiClient } from "@ton-api/client";
import { TonConnectUI, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { getJWAddress } from "@/lib/utils";

const txRequestLifetime = Date.now() + 3 * 60 * 1000; // 3 minutes for user to approve

function useWalletConnection() {
  const [tonConnectUI] = useTonConnectUI();
  const realWalletAddress = useTonAddress();
  const [impersonateWalletAddress, setImpersonateWalletAddress] = useState<string | null>(null);
  const walletAddress = impersonateWalletAddress || realWalletAddress;

  const [isConnected, setIsConnected] = useState(false);
  const [sender, setSender] = useState<Sender | null>(null);
  const [tonApi, setTonApi] = useState<TonApiClient | null>(null);
  const [tonClient, setTonClient] = useState<TonClient | null>(null);

  useEffect(() => {
    if (walletAddress !== "") {
      setIsConnected(true);

      const sender_ = {
        send: async (args: SenderArguments) => {
          console.log("args", args, args.to.toString());
          await tonConnectUI!.sendTransaction({
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc()?.toString("base64"),
              },
            ],
            validUntil: txRequestLifetime,
          });
        },
        address: walletAddress,
      } as unknown as Sender;
      setSender(sender_);

      const tonClient = new TonClient({
        endpoint: `https://toncenter.com/api/v2/jsonRPC`,
        apiKey: process.env.NEXT_PUBLIC_TONCENTER_APIKEY!,
      });
      setTonClient(tonClient);

      const tonApi = new TonApiClient({
        apiKey: process.env.NEXT_PUBLIC_TONAPI_APIKEY!,
      });
      setTonApi(tonApi);
    } else {
      setIsConnected(false);
      setSender(null);
      setTonApi(null);
      setTonClient(null);
    }
  }, [walletAddress, tonConnectUI]);

  return {
    isConnected,
    sender,
    tonApi,
    tonClient,
    walletAddress,
    tonConnectUI,
    impersonateWalletAddress,
    setImpersonateWalletAddress,
  };
}

interface WalletContextType {
  isConnected: boolean;
  isAdmin: boolean;
  sender: Sender | null;
  tonApi: TonApiClient | null;
  tonClient: TonClient | null;
  walletAddress: string;
  impersonateWalletAddress?: string | null;
  setImpersonateWalletAddress?: (address: string | null) => void;

  jettonMasterAddress: Address;
  jettonMasterAddress_old: Address;
  jettonMasterAddress_1: Address;
  jettonMasterAddress_2: Address;
  jettonMasterAddress_3: Address;

  jettonWalletAddress_1: Address | null;
  jettonWalletAddress_2: Address | null;
  jettonWalletAddress_3: Address | null;

  nftCollectionAddress_1: Address;
  nftCollectionAddress_2: Address;
  nftCollectionAddress_3: Address;
  nftCollectionAddress: Address;
  nftCollectionAddress_old: Address;

  omGiverAddress_1: Address;
  omGiverAddress_2: Address;
  omGiverAddress_3: Address;
  omGiverAddress: Address;
  omGiverAddress_old: Address;
  adminAddress: Address;
  tonConnectUI: TonConnectUI | null;
  exchangerAddress_1: Address;
  exchangerAddress_2: Address;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const { isConnected, sender, tonApi, tonClient, walletAddress, tonConnectUI, impersonateWalletAddress, setImpersonateWalletAddress } = useWalletConnection();
  // const walletAddress = "UQDbVOolAt-f_P9HBMjT6cih2V2n_A3BI1oedjS6QqohVw9I"
  const jettonMasterAddress_1 = Address.parse(
    process.env.NEXT_PUBLIC_JETTON_MASTER_ADDRESS_1!
  );
  const jettonMasterAddress_2 = Address.parse(
    process.env.NEXT_PUBLIC_JETTON_MASTER_ADDRESS_2!
  );
  const jettonMasterAddress_3 = Address.parse(
    process.env.NEXT_PUBLIC_JETTON_MASTER_ADDRESS_3!
  );
  
  // Add state for jettonWalletAddresses
  const [jettonWalletAddress_1, setJettonWalletAddress_1] = useState<Address | null>(null);
  const [jettonWalletAddress_2, setJettonWalletAddress_2] = useState<Address | null>(null);
  const [jettonWalletAddress_3, setJettonWalletAddress_3] = useState<Address | null>(null);

  useEffect(() => {
    if (tonApi && walletAddress) {
      getJWAddress(tonApi, jettonMasterAddress_1, walletAddress).then(setJettonWalletAddress_1);
      getJWAddress(tonApi, jettonMasterAddress_2, walletAddress).then(setJettonWalletAddress_2);
      getJWAddress(tonApi, jettonMasterAddress_3, walletAddress).then(setJettonWalletAddress_3);
    } else {
      setJettonWalletAddress_1(null);
      setJettonWalletAddress_2(null);
      setJettonWalletAddress_3(null);
    }
  }, [tonApi, walletAddress]);

  const nftCollectionAddress_1 = Address.parse(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS_1!
  );
  const nftCollectionAddress_2 = Address.parse(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS_2!
  );
  const nftCollectionAddress_3 = Address.parse(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS_3!
  );
  
  const omGiverAddress_1 = Address.parse(process.env.NEXT_PUBLIC_OMGIVER_ADDRESS_1!);
  const omGiverAddress_2 = Address.parse(process.env.NEXT_PUBLIC_OMGIVER_ADDRESS_2!);
  const omGiverAddress_3 = Address.parse(process.env.NEXT_PUBLIC_OMGIVER_ADDRESS_3!);

  const exchangerAddress_1 = Address.parse(process.env.NEXT_PUBLIC_EXCHANGER_ADDRESS_1!);
  const exchangerAddress_2 = Address.parse(process.env.NEXT_PUBLIC_EXCHANGER_ADDRESS_2!);

  const adminAddress = Address.parse(process.env.NEXT_PUBLIC_ADMIN_ADDRESS!);
  // Check if the connected wallet is the admin
  const isAdmin = isConnected && walletAddress === adminAddress.toString({bounceable: false});
  
  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isAdmin,
        sender,
        tonApi,
        tonClient,
        walletAddress,
        impersonateWalletAddress,
        setImpersonateWalletAddress,
        jettonMasterAddress: jettonMasterAddress_3,
        jettonMasterAddress_old: jettonMasterAddress_1,
        jettonMasterAddress_1,
        jettonMasterAddress_2,
        jettonMasterAddress_3,
        jettonWalletAddress_1,
        jettonWalletAddress_2,
        jettonWalletAddress_3,
        nftCollectionAddress_1,
        nftCollectionAddress_2,
        nftCollectionAddress_3,
        nftCollectionAddress: nftCollectionAddress_3,
        nftCollectionAddress_old: nftCollectionAddress_1,
        omGiverAddress_3,
        omGiverAddress_2, 
        omGiverAddress_1,
        omGiverAddress: omGiverAddress_3,
        omGiverAddress_old: omGiverAddress_1,
        adminAddress,
        tonConnectUI,
        exchangerAddress_1,
        exchangerAddress_2,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletContextProvider");
  }
  return context;
} 