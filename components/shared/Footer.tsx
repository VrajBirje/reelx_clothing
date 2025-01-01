import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Input } from '../ui/input'

export const Footer = () => {
    return (
        <footer className='w-full flex flex-col border-t bg-slate-100 mt-10 '>
            <div className='w-full flex justify-center items-start py-20 md:pt-24 2xl:max-w-screen-xl mx-auto w-full'>
                <div className="flex flex-col w-[50%] items-start gap-[20px] h-full justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <img src="./logo.jpg" alt="" className="h-11" />
                        <p className="text-3xl font-medium">Reelx.</p>
                    </div>
                    <p className="text-xs w-[85%]">
                        Experience ultimate comfort and style with our exclusive collection of oversized t-shirts. Perfectly crafted for a relaxed fit, our tees redefine everyday fashion with effortless flair
                    </p>
                    <div className='flex gap-3'>
                        <FaFacebook />
                        <FaInstagram />
                        <FaPinterest />
                        <FaTwitter />
                        <FaLinkedin />
                    </div>
                </div>

                {/* links */}
                <div className='flex w-[50%] justify-between gap-20'>
                    <div className='flex flex-col gap-[16px]'>
                        <p className='text-sm font-bold'>Shop</p>
                        <div className="flex flex-col gap-[8px]">
                            <p className='text-xs font-light'>Minimalist</p>
                            <p className='text-xs font-light'>Gym Wear</p>
                            <p className='text-xs font-light'>Plain</p>
                            <p className='text-xs font-light'>New Arrival</p>
                            <p className='text-xs font-light'>Discounts</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[16px]'>
                        <p className='text-sm font-bold'>Help & Support</p>
                        <div className="flex flex-col gap-[8px]">
                            <p className='text-xs font-light'>About</p>
                            <p className='text-xs font-light'>Contact us</p>
                            <p className='text-xs font-light'>Size Chart</p>
                            <p className='text-xs font-light'>FAQs</p>
                            <p className='text-xs font-light'>Terms of Service</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[16px]'>
                        <p className='text-sm font-bold'>Orders</p>
                        <div className="flex flex-col gap-[8px]">
                            <p className='text-xs font-light'>Order Tracking</p>
                            <p className='text-xs font-light'>Shipping & Delivery</p>
                            <p className='text-xs font-light'>Returns & Exchanges</p>
                            <p className='text-xs font-light'>Payment Options</p>
                            <p className='text-xs font-light'>Offers & Deals</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}