import React,{Suspense} from 'react'
import LeftBar from '@/components/LeftBar'
import Loading from '@/components/Loading'
import { getFavoriteData } from '@/lib/action'
import DisplayNft from '@/components/Nft/DisplayNft'

const Favoritepage = async() => {
  const promise = getFavoriteData()
  const data = await promise
  console.log(data,"data")
  return (
    <div className='flex lg:mx-6'>
        <div className="hidden lg:flex w-1/5 sticky top-0 h-screen">
           <LeftBar/>
        </div>
       <div className="w-full lg:w-4/5 ">
          <Suspense fallback={<Loading/>}>
              <DisplayNft promise={promise} allIsFavorite={true} />
              {/* <DisplayNft /> */}
          </Suspense>      
        </div>
    </div>
  )
}

export default Favoritepage