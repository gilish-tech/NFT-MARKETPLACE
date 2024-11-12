"use client"
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4" >
          {
            Array.from({length:10},(_,i)=>(
              <div
                key={i}
                className="w-full bg-gradient-to-br  shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden"
              >
                  <Skeleton
                    className="w-full h-80 object-cover rounded-t-lg bg-gray-800"
                  />

                  <Skeleton
                    className="mt-5  w-full h-5 object-cover rounded-t-lg bg-gray-800"
                  />
                 
            

              </div>
              
            ))
          }
    
    
    </div>

   </div>
  )
}

export default Loading