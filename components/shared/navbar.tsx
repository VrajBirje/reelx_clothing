"use client"; // Add this to indicate this file should run on the client-side

import { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { auth } from "@clerk/nextjs";
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Input } from "@/components/ui/input";

export const Navbar = async () => {
  // const { userId } = await auth();

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 50) {
        navbar?.classList.add("fixed", "top-0", "left-0", "z-50");
      } else {
        navbar?.classList.remove("fixed", "top-0", "left-0", "z-50");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar" // Add an id to target the navbar for scroll behavior
      className="px-10 w-full h-16 border-b shadow-sm bg-white flex items-center justify-between transition-all duration-300 ease-in-out"
    >
      {/* <div className="flex items-center gap-x-2">
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
      </div>  */}
      <div className="flex justify-start items-center gap-5 w-[15vw]">
        <p className='text-sm'>Shop</p>
        <p className='text-sm'>About</p>
        <p className='text-sm'>Contact</p>
      </div>

      {/* center section */}
      <div className='flex items-center justify-center gap-3' >
        <img src="./logo.jpg" alt="" className='h-11' />
        <p className='text-3xl font-medium'>Reelx.</p>
      </div>

      {/* left section  */}
      <div className='flex items-center justify-end gap-6 w-[15vw]'>
        {/* <div className="">
          <div className="relative w-full max-w-md shadow-none">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} color='black' />
            <input
              type="text"
              className="pr-10 pl-2 shadow-none focus:outline-none  py-0.75 w-[15vw] border-[0.5px] border-black-900"
            />
          </div>
        </div> */}
        <Search />
        <User />
        <Heart />
        <ShoppingCart />

      </div>
    </nav>
  );
};
