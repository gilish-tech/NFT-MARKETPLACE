import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


const idMapping = new Map<string, number>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function encodeId(id: number): string {
  const uniqueId = id.toString(36); // Base-36 encoding
  idMapping.set(uniqueId, id); // Store mapping for later decoding
  return uniqueId;
}


// Function to decode the unique identifier back to the NFT ID
export function decodeId(uniqueId: string): number | undefined {
  return idMapping.get(uniqueId);
}



export const displayAddress = (address:string)=>{
  return `${address.slice(0,5)}...${address.slice(-3)}`
}


export function formatEthBalance(balance: bigint): string {
  const decimals = 4;           // Decimal precision for display
  
  const weiInEth = BigInt(1e18); // 1 ETH = 10^18 Wei (smallest ETH unit)
  
  // Convert BigInt balance from Wei to ETH (keeping extra precision)
  const ethBalance = Number(balance) / Number(weiInEth);
  
  // Format with abbreviations for large balances
  let formattedBalance: string;
  if (ethBalance >= 1_000_000_000) {
    formattedBalance = (ethBalance / 1_000_000_000).toFixed(decimals) + "B";
  } else if (ethBalance >= 1_000_000) {
    formattedBalance = (ethBalance / 1_000_000).toFixed(decimals) + "M";
  } else if (ethBalance >= 1_000) {
    formattedBalance = (ethBalance / 1_000).toFixed(decimals) + "K";
  } else {
    formattedBalance = ethBalance.toFixed(decimals);
  }


  return formattedBalance;
}

