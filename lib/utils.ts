import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


const idMapping = new Map<string, number>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



function encodeId(id: number): string {
  const uniqueId = id.toString(36); // Base-36 encoding
  idMapping.set(uniqueId, id); // Store mapping for later decoding
  return uniqueId;
}


// Function to decode the unique identifier back to the NFT ID
function decodeId(uniqueId: string): number | undefined {
  return idMapping.get(uniqueId);
}