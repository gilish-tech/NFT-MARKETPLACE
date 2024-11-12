"use client"

import { http, createConfig } from 'wagmi'
import {  sepolia } from 'wagmi/chains'
import {  safe,metaMask} from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask(),
    safe(),
  ],
  transports: {   
    [sepolia.id]: http(),
    
  },
})


