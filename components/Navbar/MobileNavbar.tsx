"use client"
import React from 'react';
import Image from 'next/image';
// import { ConnectWalletButton } from '../ui/WalletButton';
import { FaSearch } from 'react-icons/fa';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';
import LeftBar from '../LeftBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAccount, useBalance } from 'wagmi'
import { useUserStore } from '@/store/userStore';
import { ConnectWalletButton, DisConnectWalletButton } from '../ui/WalletButton';
import { displayAddress } from "@/lib/utils";
import { FaEthereum } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import {formatEthBalance} from "@/lib/utils"
const MobileNavbar = () => {
  const account = useAccount();
  const user = useUserStore((state) => state.user);
  
  const balance = useBalance({
    address: account.address
  })

  if (account) {
    console.log(account.address)
    console.log(balance.data)

  }

  return (
    <nav className="bg-black fixed top-0 w-full z-10 flex items-center justify-between py-3 px-4 shadow-md md:hidden">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <Image
          height={32}
          width={32}
          alt="logo"
          src="/images/logo.png"
          className="rounded-full object-cover"
        />
        <h1 className="text-white font-bold text-lg">Gilish-Colls</h1>
      </div>

      {/* Right Side: Wallet, Search, and Hamburger Menu */}
      <div className="flex items-center gap-4">
        {/* Connect Wallet Button */}
        {
          user?.walletAddress ? (

            // <Button text={`${balance.data?.formatted}`} icon={< FaEthereum />} />
            <DisConnectWalletButton />
          ) : (
            // <button key={connector.uid} onClick={() => connect({ connector })} className='bg-gray-500 px-5 py-2 rounded-[25px]'>Connect Wallet</button>
            <ConnectWalletButton small />

          )
        }


        {/* Search Icon */}
        <button aria-label="Search" className="text-white">
          <FaSearch className="text-xl" />
        </button>

        {/* Hamburger Menu with Side Sheet */}
        <Sheet>
          <SheetTrigger>
            <span aria-label="Menu" className="text-white">
              <GiHamburgerMenu className="text-2xl" />
            </span>
          </SheetTrigger>
          <SheetContent className="bg-black text-white ">
            {
              user?.walletAddress && (
                <>
                  <div className="flex items-center text-base gap-2 mb-4">
                    <h2 className="text-base font-semibold ">{user?.name ? user.name : displayAddress(user.walletAddress)}</h2>
                    {
                      user.profilePhoto ? (

                        <Image src={user.profilePhoto} alt='' width={28} height={28} className='rounded-full' />
                      ) : (

                        <RxAvatar className='w-7 h-7 rounded-full text-white/80' />

                      )
                    }

                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <p className="text-sm ">{formatEthBalance(balance.data?.value || BigInt(0))}</p>
                    < FaEthereum className='500' />

                  </div>
                </>

              )
            }
            <LeftBar />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;

