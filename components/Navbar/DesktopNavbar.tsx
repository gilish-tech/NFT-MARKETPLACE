"use client"

import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaCrown } from "react-icons/fa6";
import Image from "next/image"
import { IoMdArrowDropdown } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import {   useAccount, useBalance, useSendTransaction } from 'wagmi'
import {ConnectWalletButton,DisConnectWalletButton} from '../ui/WalletButton';
// import {use} from "wagmi"
import {displayAddress} from "@/lib/utils"
import { parseEther } from 'viem';
import { useUserStore } from '@/store/userStore';
import { RxAvatar } from "react-icons/rx";
import { formatEthBalance } from '@/lib/utils';


const Navbar = () => {
  
  const account = useAccount();
  const user = useUserStore((state)=>state.user)
  const {  sendTransaction } = useSendTransaction()

  const balance = useBalance({
    address: account.address
  })

  if (account) {
    console.log(account.address)
    console.log(balance.data)

  }
  // useEffect(()=>{
  //   console.log("acc",account.address)
  // })
  return (
    <nav className='mx-2 lg:mx-6 my-3 bg-black hidden md:flex'>
      {/* everython container  */}
      <div className=" flex  items-center w-full  gap-2">

        {/* logo and input container  */}
        <div className="flex gap-3 items-center w-5/6 lg:w-4/6 ">
          {/* this is the title  */}

          <div className="flex gap-2">
            <Image height={32} width={32} alt="logo" src="/images/logo.png" className=' w-8 h-8 rounded-full object-cover' />

            <h1 className='hidden lg:block lg:text-[25px] tracking-tight text-white font-bold '>GILISH COLLS</h1>
          </div>
          {/* the search bar  */}

          <div className="flex gap-2 border-2 border-gray-300 flex-1 py-4 rounded-[50px] px-2 ">
            <FaSearch className='text-white text-xl' />
            <input className="text-white text-sm placeholder:text-gray-500 outline-none bg-transparent flex-1" placeholder='Search NFT, Collection or Artist' />
          </div>

        </div>






        {/* avatar image notifcontaine and acc-balance */}

        <div className="flex justify-between items-center w-1/6 lg:w-2/6 gap-2">
          {/* display account balance */}

          {
            user?.walletAddress ? (

              // <Button text={`${balance.data?.formatted}`} icon={< FaEthereum />} />
              <DisConnectWalletButton/>
            ) : (
              // <button key={connector.uid} onClick={() => connect({ connector })} className='bg-gray-500 px-5 py-2 rounded-[25px]'>Connect Wallet</button>
              <ConnectWalletButton />

            )
          }

          {/* Display Notification  */}

          <div className="hidden lg:flex items-center gap-3">

            <div className=" flex  items-center justify-center h-8 w-8  rounded-full bg-gray-600 p-1">
             
              <IoIosNotifications className='text-gray-400 text-2xl ' />
              {/* crown  */}
            </div>
            <FaCrown className=' text-2xl text-yellow-500' />
          </div>



          {/* Display user Profile */}

          {
            user?.walletAddress &&(
              <div className="hidden lg:flex gap-3 items-center">
                {
                  user.profilePhoto?(

                    <Image src={user.profilePhoto} alt='' width={28} height={28} className='rounded-full' />
                  ):(

                    <RxAvatar  className='w-7 h-7 rounded-full text-white/80'/>

                  )
                }

                <div className="hidden lg:flex flex-col justify-center ">
                  {
                    user?.name ?(
                      
                      <p className='text-[14px]' onClick={() => sendTransaction({ to: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", value: parseEther("100") })}>{user?.name}</p>
                    ):(

                      <p className='text-[14px]' onClick={() => sendTransaction({ to: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", value: parseEther("100") })}>{displayAddress(user.walletAddress)}</p>
                    )
                  }
                  <div className="flex items-center text-[12px] text-gray-200">
                    < FaEthereum />
                     
                    <p className=''>{formatEthBalance(balance.data?.value || BigInt(0))}</p>
                  </div>
                </div>
                <IoMdArrowDropdown />

              </div>

            )
          }



        </div>












      </div>

    </nav>
  )
}

export default Navbar