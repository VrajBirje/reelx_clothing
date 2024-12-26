import { UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from "@clerk/nextjs";
import React from 'react'
import { MobileSidebar } from './mobile-sidebar';
import Topbar from './topbar';

export const Navbar = async () => {
  const { userId } = await auth();
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
        {userId ? (
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
        ) : (
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between">
            <Button size='sm' variant='outline' asChild>
              <Link href='/sign-in'>Login</Link>
            </Button>
            <Button size='sm' asChild>
              <Link href='/sign-up'>Sign-Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
