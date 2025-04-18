import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Address, SenderArguments, TonClient, type Sender } from "@ton/ton";
import { TonApiClient } from "@ton-api/client";
import { TonConnectUI, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

const txRequestLifetime = Date.now() + 3 * 60 * 1000; // 3 minutes for user to approve

function useWalletConnection() {
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress = useTonAddress();

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
    tonConnectUI
  };
} 


interface WalletContextType {
  isConnected: boolean;
  isAdmin: boolean;
  sender: Sender | null;
  tonApi: TonApiClient | null;
  tonClient: TonClient | null;
  walletAddress: string;
  jettonMasterAddress: Address;
  nftCollectionAddress: Address;
  omGiverAddress: Address;
  adminAddress: Address;
  tonConnectUI: TonConnectUI | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const { isConnected, sender, tonApi, tonClient, walletAddress, tonConnectUI } = useWalletConnection();
  
  const jettonMasterAddress = Address.parse(
    process.env.NEXT_PUBLIC_JETTON_MASTER_ADDRESS!
  );
  const nftCollectionAddress = Address.parse(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS!
  );
  const omGiverAddress = Address.parse(process.env.NEXT_PUBLIC_OMGIVER_ADDRESS!);
  const adminAddress = Address.parse(process.env.NEXT_PUBLIC_ADMIN_ADDRESS!);
  // Check if the connected wallet is the admin
  const isAdmin = isConnected && walletAddress === adminAddress.toString({bounceable: false});
  console.log("isAdmin", isAdmin);
  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isAdmin,
        sender,
        tonApi,
        tonClient,
        walletAddress,
        jettonMasterAddress,
        nftCollectionAddress,
        omGiverAddress,
        adminAddress,
        tonConnectUI
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