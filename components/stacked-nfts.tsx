"use client";

import Image from "next/image";
import { NftItem } from "@ton-api/client";

interface StackedNftsProps {
  userNfts: NftItem[];
}

export function StackedNfts({ userNfts }: StackedNftsProps) {
  return (
    <div className="relative w-40 h-40 mb-4">
      {userNfts.slice(0, 3).map((nft, index) => (
        <div
          key={nft.address.toString()}
          className="absolute w-40 h-40 rounded-lg overflow-hidden border bg-white shadow-md transition-transform hover:scale-105"
          style={{
            transform: `translate(${index * 8}px, ${index * 8}px) rotate(${
              index * 2
            }deg)`,
            zIndex: 3 - index,
          }}
        >
          <Image
            src="placeholder.jpg"
            alt={`OM NFT ${index + 1}`}
            width={160}
            height={160}
            className="object-cover"
          />
        </div>
      ))}
      {userNfts.length > 3 && (
        <div
          className="absolute w-40 h-40 rounded-lg overflow-hidden border bg-black shadow-md transition-transform hover:scale-105"
          style={{
            transform: `translate(32px, -4px) rotate(16deg)`,
            transformOrigin: "bottom left",
            zIndex: 0,
          }}
        >
          <div className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
            +{userNfts.length - 3}
          </div>
        </div>
      )}
    </div>
  );
} 