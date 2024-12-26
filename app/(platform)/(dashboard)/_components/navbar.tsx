import { Logo } from '@/components/logo';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { MobileSidebar } from './mobile-sidebar';
import Topbar from './topbar';

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      {/* Left Section */}
      <div className="flex items-center gap-x-2">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-1 flex justify-center">
        <div className="hidden md:flex">
          <Topbar />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-x-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
