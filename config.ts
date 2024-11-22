"use client"

import { http, createConfig } from 'wagmi'
import {  sepolia,localhost } from 'wagmi/chains'
import {  safe,metaMask} from 'wagmi/connectors'

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


