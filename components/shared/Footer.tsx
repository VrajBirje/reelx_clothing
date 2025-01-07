import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Input } from '../ui/input'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const Footer = () => {
    return (
        <footer className='w-full flex flex-col border-t bg-slate-100 mt-10 '>
            <div className='footer w-full flex flex justify-center items-start py-20 md:pt-24 2xl:max-w-screen-xl mx-auto w-full'>
                <div className="footer1 flex flex-col w-[50%] items-start gap-[20px] h-full justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <img src="./logo.jpg" alt="" className="h-11" />
                        <p className="text-3xl font-medium">Reelx.</p>
                    </div>
                    <p className="text-xs w-[85%]">
                        Experience ultimate comfort and style with our exclusive collection of oversized t-shirts. Perfectly crafted for a relaxed fit, our tees redefine everyday fashion with effortless flair
                    </p>
                    <div className='flex footersocial2 gap-3'>
                        <FaFacebook size={24} />
                        <FaInstagram size={24} />
                        <FaPinterest size={24} />
                        <FaTwitter size={24} />
                        <FaLinkedin size={24} />
                    </div>
                </div>

                {/* links */}
                <div className='footerlinks flex w-[50%] justify-between gap-20'>
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
                <Accordion type="single" collapsible className="w-full footerlinks2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Shop</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-[8px]">
                                <p className='text-sm font-light'>Minimalist</p>
                                <p className='text-sm font-light'>Gym Wear</p>
                                <p className='text-sm font-light'>Plain</p>
                                <p className='text-sm font-light'>New Arrival</p>
                                <p className='text-sm font-light'>Discounts</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Help & Support</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-[8px]">
                                <p className='text-sm font-light'>About</p>
                                <p className='text-sm font-light'>Contact us</p>
                                <p className='text-sm font-light'>Size Chart</p>
                                <p className='text-sm font-light'>FAQs</p>
                                <p className='text-sm font-light'>Terms of Service</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Orders</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-[8px]">
                                <p className='text-sm font-light'>Order Tracking</p>
                                <p className='text-sm font-light'>Shipping & Delivery</p>
                                <p className='text-sm font-light'>Returns & Exchanges</p>
                                <p className='text-sm font-light'>Payment Options</p>
                                <p className='text-sm font-light'>Offers & Deals</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className='footersocial flex items-center justify-center gap-4 w-full '>
                    <FaFacebook size={24} />
                    <FaInstagram size={24} />
                    <FaPinterest size={24} />
                    <FaTwitter size={24} />
                    <FaLinkedin size={24} />
                </div>
            </div>
        </footer>
    )
}
