import React from 'react';
import Image from 'next/image';
import { ConnectWalletButton } from '../ui/WalletButton';
import { FaSearch } from 'react-icons/fa';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';
import LeftBar from '../LeftBar';
import { GiHamburgerMenu } from 'react-icons/gi';

const MobileNavbar = () => {
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
        <ConnectWalletButton small />

        {/* Search Icon */}
        <button aria-label="Search" className="text-white">
          <FaSearch className="text-xl" />
        </button>

        {/* Hamburger Menu with Side Sheet */}
        <Sheet>
          <SheetTrigger>
            <button aria-label="Menu" className="text-white">
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-black text-white p-6">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <LeftBar />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;
