// "use client"
import React from 'react'
import {Card} from "@/components/ui/card"
import Image from "next/image"
import {NFTAttributes} from "@/types/nft";
import {ipfsGateway} from "@/lib/handleIpfsImage"
import { MdVerified } from "react-icons/md";

import { MdSkipNext } from "react-icons/md";
import Link from 'next/link'
import AddToFavorite from "@/components/Nft/AddToFavorite";
import { Favorite } from '@prisma/client';

import MoveStateToZustand from './MoveStateToZustand';

import { FaEthereum } from "react-icons/fa";
import BuyButton from './BuyButton';



type AttributeOverlayProps = {
  attributes: { trait_type: string; value: string  }[];
};

const AttributeOverlay: React.FC<AttributeOverlayProps> = ({ attributes }) => (
  <div className="absolute inset-0 bg-black bg-opacity-75 text-white flex flex-col items-start p-4 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
    <h4 className="text-lg font-semibold mb-2">Attributes</h4>
    <ul className="space-y-1">
      {attributes.map((attr, index) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <span className="font-bold text-gray-400">{attr.trait_type}:</span>
          <span>{attr.value}</span>
        </li>
      ))}
    </ul>
  </div>
);


type DisplayNftProps = {
  promise: Promise<{data:NFTAttributes,id:string | undefined,price:string}[]>;
  pathId?:number;nftFavoritePromise?:Promise<Favorite[] | null>;
  allIsFavorite?:boolean;
  bought?:boolean;
  

}

const DisplayNft = async({ promise,pathId,nftFavoritePromise,allIsFavorite,bought }: DisplayNftProps) => {


  
  const [tokens,nftFavorite] =  await Promise.all([promise,nftFavoritePromise])
  let favNfts = []
  favNfts = nftFavorite?.map((item)=>(
      item.nftId

  )) || []

  console.log("ggg",favNfts)
  // setFavorite(favNfts)
  
  if(allIsFavorite){
    favNfts = tokens.map((token)=>token.id).filter((item)=>item!=undefined)
 
  }

  return (
    <>
    <MoveStateToZustand faveNfts={favNfts}/>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4" >
      {tokens.map((token) => (
        <Card
          
          key={token.id}
          className="relative w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black/80 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden"
        >
          <div className="relative">
            {/* <MdFavoriteBorder className="cursor-pointer z-10 absolute text-3xl text-pink-500 bottom-3 right-3 bg-gray-900/60 p-1 rounded-full hover:scale-110 transition-transform duration-200" /> */}
            <AddToFavorite nftId={token.id}  favorites={(favNfts)as string[]} />
            <Image
              src={ipfsGateway(token.data.image)}
              alt=""
              width={500}
              height={700}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <AttributeOverlay attributes={token.data.attributes} />
          </div>

          <div className="p-4">
            <div className="flex items-center text-sm gap-2 mb-2">
              <p className="text-sm text-gray-400">Gilish_tech</p>
              <MdVerified className="text-purple-500" />
            </div>
            <h5 className="text-[14px] font-bold text-gray-100 tracking-wide mb-3">Brilliant Apes</h5>
            {
              !bought &&(

                
                <div className="flex gap-4 bg-gray-800/70 p-3 rounded-lg">
              {/* Minting status */}
              <div className="flex flex-col items-start">
                <p className="text-[13px] text-gray-400">Minting</p>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-white text-sm font-medium">Now</p>
                </div>
              </div>

              {/* Price */}
              
              <div className="flex flex-col items-start">
                <p className="text-[13px] text-gray-400">Price</p>
                <div className="flex text-sm text-white items-center">
                  <p className="  font-semibold">{parseFloat(token.price).toFixed(3)}</p>
                   <FaEthereum/>
                </div>
              </div>
            </div>
            )
            }

            {
              !bought && (
                <BuyButton price={token.price} nftId={token.id || ""}/>
              )
            }
          
            
            
          </div>
        </Card>



        

        
      ))}

      {
        pathId &&(

        <div className="flex justify-center mt-6">
          <Link href={`/nfts/${pathId + 1}`}
            // onClick={() => setPage(page + 1)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <MdSkipNext  className='text-5xl'/>

          </Link>
        
        </div>

        )
      }


      
    </div>
    </>
  );
};

export default DisplayNft;
