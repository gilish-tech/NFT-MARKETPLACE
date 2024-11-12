"use client"

import React, { useEffect } from 'react'
import { useWriteContract } from 'wagmi'
import { contractABI } from "@/lib/abi"
import { ethers } from "ethers"
import { useToast } from "@/hooks/use-toast"
import { saveMintedNfts } from "@/lib/action"
import BuyingLoading from '../BuyingLoading'
import { useUserStore } from '@/store/userStore';
import {ConnectWalletButton} from "@/components/ui/WalletButton";

const BuyButton = ({ price, nftId }: { price: string, nftId: string }) => {
    const { abi } = contractABI
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { toast } = useToast()
    const user = useUserStore((state)=>state.user)

    useEffect(() => {
        if (hash) {

            toast({
                title: "Nft Minted Succesfully",
                description: `Transcation hash ${hash}`,
            })

            handleSaveMint(hash)





        }
    }, [hash])

    const handleSaveMint = async (hash: string) => {
        console.log("saving")
        try {

            await saveMintedNfts(hash, nftId)
        } catch (err) {
            throw err
        }

    }

    const handleBuyNft = async () => {
        const address = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`)
        console.log("address", address)

        writeContract({
            address,
            abi,
            functionName: "MintAnNft",
            args: [nftId],
            value: ethers.parseEther(price),

        })
    }
    return (
        <>
            {
                isPending && (
                    <BuyingLoading/>

                )
            }

            {
                user ?(

                <button onClick={() => handleBuyNft()} className="w-full py-2 mt-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200">
                    Buy Now
                </button>
                ):
                (
                    <ConnectWalletButton text="Buy Now" styles='w-full py-2 mt-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200'/>
                    
                )
            }

        </>
    )
}

export default BuyButton