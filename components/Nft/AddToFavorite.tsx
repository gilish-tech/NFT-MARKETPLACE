"use client"

import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { deleteFavorite,addToFavorite } from '@/lib/action';

import { MdFavorite } from "react-icons/md";
import { useRouter } from 'next/navigation'
// import { Favorite } from '@prisma/client';
import { useFavoriteStore } from '@/store/favoriteStore';
import {useUserStore} from "@/store/userStore"
import { useToast } from "@/hooks/use-toast"

const AddToFavorite = ({nftId}:{nftId:string |undefined, favorites:string[]}) => {

  const favorites = useFavoriteStore((state)=>state.favorites)
  const addFavorite = useFavoriteStore((state)=>state.addFavorite)
  const removeFavorite= useFavoriteStore((state)=>state.removeFavorite)
  const user = useUserStore((state)=>state.user)
  const { toast } = useToast()


  const router = useRouter()  
  if(!nftId){
    return null
  }

  const handleaddNftToFavorite = async()=>{
    if (!user){
      return
    }
    try{
      // throw ("err")
      favorites.push(nftId)
      addFavorite(nftId)
      await addToFavorite(nftId!)
      
      router.refresh()
      toast({
        
       
        description: `Nft added to favorite Connected`,
        
      })

    }catch(err){
      toast({

        
       variant:"destructive",
       title: "Uh oh! Something went wrong.",
       description: "There was a problem adding Nft.",
        
        
      })
      throw err

    }
    
    
    
  }
  const handleaDeleteFromFavorite = async()=>{
    try{
      favorites.push(nftId)
      removeFavorite(nftId)
      await deleteFavorite(nftId!)
      router.refresh()

    }catch(err){
      throw err
    }



  }

  return (
    <div >
      {
        favorites.includes(nftId!)?(

          <MdFavorite onClick={async()=>await handleaDeleteFromFavorite()} className="cursor-pointer z-10 absolute text-3xl text-pink-500 bottom-3 right-3 bg-gray-900/60 p-1 rounded-full hover:scale-110 transition-transform duration-200" />
        ):
        (
          <MdFavoriteBorder onClick={async()=>await handleaddNftToFavorite()} className="cursor-pointer z-10 absolute text-3xl text-pink-500 bottom-3 right-3 bg-gray-900/60 p-1 rounded-full hover:scale-110 transition-transform duration-200" />

        )
        
      }
      
    </div>
  )
}

export default AddToFavorite