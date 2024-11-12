"use client"

import React from 'react'
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
// import { CiWallet } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { FaRegGem } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { GiOpenTreasureChest } from "react-icons/gi";
import { IoMdExit } from "react-icons/io";
import Button from "@/components/Button";
import { usePathname } from 'next/navigation';
import Link from "next/link"
import { checkPathEquality } from '@/lib/handlePathName';





const L_PATHS = [
    {
        name:"Dashboard",
        Icon:<MdDashboard/>,
        path:"/"

    },
    {
        name:"NFT store",
        Icon:<FaRegGem />,
        path:"/nfts"

    },
    {
        name:"Active Bids",
        Icon:<FaGavel/>,
        path:"/active-bids"

    },
    {
        name:"Favourites",
        Icon:<MdFavorite />,
        path:"/favourites"

    },
    // {
    //     name:"Wallet",
    //     Icon:< CiWallet />,
    //     path:"/wallet"

    // },
    {
        name:"My Collections",
        Icon:<GiOpenTreasureChest/>,
        path:"/collections"

    },
    {
        name:"Settings",
        Icon:<IoSettingsOutline/>,
        path:"/settings"

    },
]




const LeftBar = () => {
    const pathname = usePathname()

   


 
  console.log(pathname)
  return (
    <div className='w-full my-5'>
        <h2 className='text-xl font-medium tracking-wide text-white mb-5'>Market Place</h2>

        <div className="flex flex-col gap-3">

        {
            L_PATHS.map((item,index)=>(
                <Link href={item.path} key={index}>
                    <ul className={`flex gap-2 items-center p-2 rounded-[25px] ${checkPathEquality(item.path,pathname)  && 'bg-purple-600 hover:bg-purple-600'} hover:bg-purple-400/50`} key={index} >
                        <div className="bg-gray-900 p-2 rounded-full">
                            {item.Icon}
                        </div>
                        <li>{item.name}</li>

                    </ul>
                </Link>
            ))
        }
        </div>
        
        <div className="mt-8">

            <Button text='Logout' icon={<IoMdExit className='text-[18px]'/>}></Button>
        </div>
    </div>
  )
}

export default LeftBar