import React,{Suspense} from 'react'
import LeftBar from '@/components/LeftBar'
import {getMintedNftsData} from "@/lib/action"
import DisplayNft from '@/components/Nft/DisplayNft'
import Loading from '@/components/Loading'
const page = async() => {
  const promise = getMintedNftsData()
  return (
    <div className='flex lg:mx-6'>
        <div className="hidden lg:flex w-1/5 sticky top-0 h-screen">
           <LeftBar/>
        </div>
       <div className="w-full lg:w-4/5 ">
       <Suspense fallback={<Loading/>}>
           <DisplayNft promise={promise} bought/>
       </Suspense>
       </div>
    </div>
  )
}

export default page