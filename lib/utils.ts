import { AccountEvent, Action, TonApiClient } from "@ton-api/client";
import { Address, TonClient } from "@ton/ton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OMCollection } from "./OMCollection";
import { OM } from "./OM";
import { OMGiver } from "./OMGiver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export async function nftHolders(tonClient: TonClient, tonApi: TonApiClient, collection: Address, giverAddress: Address): Promise<Map<number, {owner: Address, item: Address, index: number, claimable: bigint, address: Address}>> {
  const nfts = (await tonApi.nft.getItemsFromCollection(collection)).nftItems;
  const owners = new Map<number, {owner: Address, item: Address, index: number, claimable: bigint, address: Address}>();
  const giver = tonClient.open(OMGiver.fromAddress(giverAddress));
  const toDistribute = (await giver.getGetGiverData()).toDistribute;
  for (const nft of nfts) {
    const ownerAddress = await nft.owner!.address;
    owners.set(nft.index, {owner: ownerAddress, item: nft.address, index: nft.index, claimable: toDistribute.get(nft.index) || 0n, address: nft.address});
  }
  return owners;
}


export async function getJWAddress(tonApi: TonApiClient, jettonMasterAddress: Address, walletAddress: string) {
  const jettonWalletAddress = Address.parse(
    (
      await tonApi.blockchain.execGetMethodForBlockchainAccount(
        jettonMasterAddress,
        "get_wallet_address",
        { args: [walletAddress] }
      )
    ).decoded.jetton_wallet_address
  );
  return jettonWalletAddress;
}

export const randomInt = (): bigint => {
  return BigInt(Math.floor(Math.random() * 10000));
};

export function truncateAddress(address: string) {
  return address.length > 20
    ? `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
    : address;
}

export function formatDate(date: Date): string {
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function filterEvents(
  events: AccountEvent[],
  jettonAddress: Address,
  nftAddresses: Address[]
): (Action & {
  actionData?: any;
  timestamp?: number;
  explorerLink?: string;
  lt?: bigint;
})[] {
  if (!Array.isArray(events)) return [];

  const eventsFiltered = events.reduce(
    (
      acc: (Action & {
        actionData?: any;
        timestamp?: number;
        explorerLink?: string;
      })[],
      event
    ) => {
      if (!Array.isArray(event.actions)) return acc;

      const actions = acc.concat(
        event.actions
          .map((action) => {
            return {
              ...action,
              timestamp: event.timestamp,
              id: event.eventId,
              explorerLink: `https://tonviewer.com/transaction/${
                action.baseTransactions?.[0] || ""
              }`,
              actionData:
                action.JettonTransfer ||
                action.NftItemTransfer ||
                action.TonTransfer ||
                action.SmartContractExec,
            };
          })
          .filter((action) => {
            // Check for JettonTransfer with specific jetton address
            if (
              action.type === "JettonTransfer" &&
              action.JettonTransfer?.jetton.address.equals(jettonAddress)
            ) {
              return true;
            }

            // Check for NftItemTransfer with nft in the given array
            if (
              action.type === "NftItemTransfer" &&
              action.NftItemTransfer?.nft
            ) {
              const nftAddress = Address.parse(action.NftItemTransfer.nft);
              return nftAddresses.some((addr) => addr.equals(nftAddress));
            }

            if (
              action.type === "TonTransfer" ||
              action.type === "SmartContractExec"
            ) {
              return true;
            }

            return false;
          })
      );
      return actions;
    },
    []
  );
  return eventsFiltered;
}
