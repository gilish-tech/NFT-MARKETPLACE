
"use client"
import React, { useEffect } from 'react'
import { useFavoriteStore } from '@/store/favoriteStore';

const MoveStateToZustand = ({faveNfts}:{faveNfts:string[]}) => {
    
    const setFavorite = useFavoriteStore((state)=>state.setFavorite)
    useEffect(()=>{
        setFavorite(faveNfts)

    },[])
  return (
    <div></div>
  )
}

export default MoveStateToZustand