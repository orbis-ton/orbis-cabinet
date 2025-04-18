import { AccountEvent, Action } from "@ton-api/client";
import { Address } from "@ton/ton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
