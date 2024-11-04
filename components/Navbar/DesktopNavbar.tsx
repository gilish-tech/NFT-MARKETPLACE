"use client"

import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Button from '../Button';
import { IoIosNotifications } from "react-icons/io";
import { FaCrown } from "react-icons/fa6";
import Image from "next/image"
import { IoMdArrowDropdown } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { Connector, useConnect, useAccount, useBalance, useSendTransaction } from 'wagmi'
import {ConnectWalletButton,DisConnectWalletButton} from '../ui/WalletButton';
// import {use} from "wagmi"
import { parseEther } from 'viem';


const Navbar = () => {
  const { connectors, connect } = useConnect()
  const account = useAccount()
  const { data: hash, sendTransaction } = useSendTransaction()

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
            <Image height={200} width={200} alt="logo" src="/images/logo.png" className=' w-8 h-8 rounded-full object-cover' />

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
            account.address ? (

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


          <div className="hidden lg:flex gap-3 items-center">
            <Image src="/images/profile.png" alt='' width={28} height={28} className='rounded-full' />

            <div className="hidden lg:flex flex-col justify-center ">
              <p className='text-[14px]' onClick={() => sendTransaction({ to: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", value: parseEther("100") })}>Gilberto Diamond</p>
              <div className="flex items-center text-[12px] text-gray-200">
                < FaEthereum />
                <p className=''>{balance.data?.formatted}</p>
              </div>
            </div>
            <IoMdArrowDropdown />

          </div>

        </div>












      </div>

    </nav>
  )
}

export default Navbar