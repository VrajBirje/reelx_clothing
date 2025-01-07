"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { User } from 'lucide-react';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Sidebar } from './sidebar/Sidebar';
import "./test.css"


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
      className="nav px-10 w-full h-16 border-b shadow-sm bg-white flex items-center justify-between transition-all duration-300 ease-in-out"
    >
      <div className="nav1 flex justify-start items-center gap-5 w-[15vw]">
        <Link href='/shop'><p className='text-sm'>Shop</p></Link>
        <p className='text-sm '>About</p>
        <p className='text-sm'>Contact</p>
      </div>


      {/* center section */}
      <div className='flex items-center justify-center gap-3' >
        {/* <Menu size={26} strokeWidth={1.5} className='navmenu mr-2' /> */}
        <Sidebar/>
        <Link href='/' className='navlogo flex items-center justify-center gap-3'>
          <img src="./logo.png" alt="" className='navlogo2 h-11' />
          <p className='navlogo1 text-3xl font-medium'>Reelx.</p>
        </Link>
      </div>

      {/* left section  */}
      <div className='navleft flex items-center justify-end gap-6'>
        <Search className='navlogo3' strokeWidth={1.5} />
        <Link className='navpro' href='/profile'><User size={26} strokeWidth={1.5}/></Link>
        <Link href='/wishlist'><Heart size={26} strokeWidth={1.5}/></Link>
        <Link href='/cart'><ShoppingCart size={26} strokeWidth={1.5}/></Link>
      </div>
    </nav>
  );
};
