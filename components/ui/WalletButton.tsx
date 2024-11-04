"use client"
import { useConnect,useDisconnect } from 'wagmi'
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'

const walletNameToImage = {
  safe: "/images/safe.jpg",
  metamask: "/images/metamask.png"
}



export const DisConnectWalletButton = ({small}:{small?:boolean})=>{
    const {disconnect} = useDisconnect()
    return(
      <button className='bg-gray-700 hover:bg-gray-500/30 text-white px-6 py-2 rounded-full transition-all duration-200'
      onClick={()=>disconnect()}>Disconnect</button>
    )

}

export const ConnectWalletButton = ({small}:{small?:boolean}) => {
  const { connectors, connect } = useConnect()


  return (
    <Dialog>
      <DialogTrigger className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all duration-200">
        {small ? "Connect"  : "Connect Wallet"}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 px-6 pb-8 pt-4 rounded-lg shadow-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center text-2xl text-white mb-4">
            <Image height={64} width={64} alt="logo" src="/images/logo.png" className="w-16 h-16 rounded-full object-cover mb-2" />
            <h1>Connect to Gilish Market</h1>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3 mt-4">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="flex items-center gap-4 p-4 text-lg font-medium text-white bg-gray-800 rounded-lg hover:bg-purple-700/40 transition-colors border-b border-gray-700"
              >
                <Image
                  width={32}
                  height={32}
                
                  src={walletNameToImage[connector.name.toLowerCase() as keyof typeof walletNameToImage]}
                  alt={connector.name}
                  className="rounded-md"
                />
                <span>{connector.name}</span>
              </button>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


