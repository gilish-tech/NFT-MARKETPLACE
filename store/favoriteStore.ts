import { FaV } from "react-icons/fa6";
import {create} from "zustand"


interface FavoriteState {
  favorites : string[];
  setFavorite: (newFavorites:string[])=>void;
  addFavorite: (favorites:string)=>void;
  removeFavorite:(favorite:string)=>void;
}



export const useFavoriteStore = create<FavoriteState>((set)=>({
    favorites:[],
    addFavorite:(favorite:string)=>set((state)=>({favorites:[...(state.favorites),favorite ]})),
    setFavorite:(newFavorites:string[])=>set({favorites:newFavorites}),
    removeFavorite:(favorite:string)=>set((state)=>({favorites:state.favorites.filter((item)=>item != favorite)}))
}))