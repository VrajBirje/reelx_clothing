"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';


export const Navbar = async () => {
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar" 
      className="px-10 w-full h-16 border-b shadow-sm bg-white flex items-center justify-between transition-all duration-300 ease-in-out"
    >
      <div className="flex justify-start items-center gap-5 w-[15vw]">
        <p className='text-sm'>Shop</p>
        <p className='text-sm'>About</p>
        <p className='text-sm'>Contact</p>
      </div>

      {/* center section */}
      <div className='flex items-center justify-center gap-3' >
        <img src="./logo.png" alt="" className='h-11' />
        <p className='text-3xl font-medium'>Reelx.</p>
      </div>

      {/* left section  */}
      <div className='flex items-center justify-end gap-6 w-[15vw]'>
        <Search />
        <Link href='/profile'><User /></Link>
        <Link href='/wishlist'><Heart /></Link>
        <Link href='/cart'><ShoppingCart /></Link>
      </div>
    </nav>
  );
};
