import React from 'react'
import NftPage from './[slug]/page'
const page = () => {
    const promise:Promise<{slug:string}> = new Promise((resolve) => {
        resolve({"slug":"1"})
    }) 
  return (
    <NftPage params={promise} />
  )
}

export default page