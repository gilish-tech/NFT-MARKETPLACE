"use client"

import { http, createConfig } from 'wagmi'
import { mainnet, sepolia,localhost } from 'wagmi/chains'
import { injected, safe,metaMask} from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia,localhost],
  connectors: [
    metaMask(),
    safe(),
  ],
  transports: {   
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
})


