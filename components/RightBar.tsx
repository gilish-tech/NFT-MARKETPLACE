
"use client"
import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image"
import { RxAvatar } from "react-icons/rx";
import { FaEthereum } from "react-icons/fa";


const COLLECTORS  =[
    {
        name:"Samuel Alex",
        username:"gilish-tech",
        isFollowing:true,
        image:""
    },
    {
        name:"Lilian Mara",
        username:"lilymara225",
        isFollowing:false,
        image:""
    },
    {
        name:"Gold Special",
        username:"goldspec1023",
        isFollowing:true,
        image:""
    },
    {
        name:"Ridwan Abasco",
        username:"ridabas93211",
        isFollowing:false,
        image:""
    },
    {
        name:"Mark atiyota",
        username:"atmark22",
        isFollowing:false,
        image:""
    },
]



const TOP_CREATORS = [
    {
        image:"",
        ethBalance:39170.23,
        name:"John Carrick",
        profit:200
        
    },
    {
        image:"",
        ethBalance:1220.23,
        name:"Mikel Ramond",
        profit:-900
        
    },
    {
        image:"/images/profile.png",
        ethBalance:1000.23,
        name:"Gilberto Diamond",
        profit:300

    },
        {
            image:"",
            ethBalance:9300.23,
            name:"Pablo Marcus",
            profit:120

        },
        {
            image:"",
            ethBalance:4500.23,
            Name:"pablo sammy",
            profit:-40

        }
]

const RightBar = () => {
  return (
    <div className='flex flex-col gap-4 w-full my-5 '>
        {/* collectors  */}
        <div className="bg-gray-800 rounded-xl px-3 py-3">
            {/* heading */}
            <div className="flex items-center justify-between">
                <h2 className='text-lg font-medium tracking-wide text-white my-5'>Trending Collectors</h2>   
                <div className="flex items-center gap-2">
                    <p className='text-sm'>See all </p> 
                    <span className='text-sm'><FaChevronRight/></span>
                </div>       
            </div>
            <div className="flex flex-col gap-5">

                    {
                        COLLECTORS.map((item, index)=>(
                            <div className="flex justify-between" key={index}>
                                {/* avatar and Name container */}
                                <div className="flex items-center gap-3 ">
                                    {/* avatar  */}
                                    {
                                        item.image? (

                                            <Image alt='' height={20} width={20} src={item.image} />
                                        ):(
                                            <RxAvatar className='text-gray-400 font-bold text-2xl'/>
                                        )
                                        
                                    }
                                     {/* name        */}
                                    <div className="flex flex-col">
                                        <h6 className='text-sm'>{item.name}</h6>
                                        <span className='text-gray-400 text-[12px]'>@{item.username}</span>

                                    </div>
                                </div>

                                {/* is following  */}

                                <button className={`px-6 py-2 rounded-[24px] text-[13px] tracking-wide ${!item.isFollowing?'bg-purple-600':'bg-gray-700'}`}>{item.isFollowing?'following':'follow'}</button>

                            </div>
                        ))
                    }

            </div>

        </div>

        <div className="bg-gray-800 rounded-xl px-3 py-3">
            {/* heading */}
            <div className="flex items-center justify-between">
                <h2 className='text-lg font-medium tracking-wide text-white my-5'>Top Creators</h2>   
                <div className="flex items-center gap-2">
                    <p className='text-sm'>See all </p> 
                    <span className='text-sm'><FaChevronRight/></span>
                </div>       
            </div>

            <div className="flex flex-col gap-4">


            {
                TOP_CREATORS.map((item,index)=>(
                    
                    <div className="flex justify-between" key={index}>
                                {/* avatar and Name container */}
                                <div className="flex items-center gap-3 ">
                                    {/* avatar  */}
                                    {
                                        item.image? (

                                            <Image alt='' height={22} width={22} className='rounded-full' src={item.image} />
                                        ):(
                                            <RxAvatar className='text-gray-400 font-bold text-2xl'/>
                                        )
                                        
                                    }
                                     {/* name        */}
                                    <div className="flex flex-col">
                                        <h6 className='text-sm'>{item.name}</h6>
                                        <div className="flex items-center text-gray-400 text-[12px]">
                                            <FaEthereum className=''/>
                                            <span >{item.ethBalance}</span>
                                        </div>

                                    </div>
                                </div>


                                
                                <p className={`text-sm ${item.profit > 0 ? 'text-green-500':'text-red-500'}`}>{item.profit > 0 && "+"}{item.profit}% </p>    
                                
                    </div>


))
}
</div>

        </div>



    </div>
  )
}

export default RightBar