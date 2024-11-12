import React,{Suspense} from 'react'
import LeftBar from '@/components/LeftBar'

import {getNfts} from "@/lib/handleNft"
import DisplayNft from '@/components/Nft/DisplayNft'
import { unstable_cache } from 'next/cache'
import  Loading from '@/components/Loading'
import { getFavorite } from '@/lib/action'  

const NftPage = async(
  {
    params,
  }: {
    params: Promise<{ slug: string }>
  }
) => {
  const slug = +(await params).slug
  
  const cacheTokens  = unstable_cache(async()=>{
      return getNfts(slug)
    
  },
  ["nfts" + slug.toString()],
  {revalidate:7000, tags:[`nfts-${slug.toString()}`]}

)  
  
 const nftFavoritePromise = getFavorite()

  return (
    <>
      {/* <BuyingLoading/> */}
    <div className='flex lg:mx-6'>
        <div className="hidden lg:flex w-1/5 sticky top-0 h-screen">
           <LeftBar/>
        </div>
       <div className="w-full lg:w-4/5 ">
          <Suspense fallback={<Loading/>}>
              <DisplayNft pathId={slug} promise={cacheTokens()} nftFavoritePromise={nftFavoritePromise}/>
              
          </Suspense>      
        </div>
    </div>
    </>
  )
}

export default NftPage