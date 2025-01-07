import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Heart, Ruler, Share2, ShoppingBag } from 'lucide-react'
import React from 'react'
import "./product.css"

const page = () => {
  return (
    <div className='productmain flex py-[20px] justify-center bg-white px-[4%] w-full flex-col items-center gap-[10px] '>
      <p className='text-xs font-medium'>Home / Shop / Gym-Wear / <b>Printed Oversized T-Shirt</b></p>
      <div className='productmain2 w-full flex items-start justify-center mt-[20px] gap-[20px]'>
        <div className='productimgbox w-[68%] flex flex-wrap overflow-y-auto'>
          <img src="/assets/img6.png" className='productimg1 w-[50%]' alt="" />
          <img src="/assets/img6.png" className='productimg1 w-[50%]' alt="" />
          <img src="/assets/img6.png" className='productimg1 w-[50%]' alt="" />
        </div>
        <div className='productimgbox2 w-[100%] flex flex-col '>
          <img src="/assets/img6.png" className='productimg1 w-[100%]' alt="" />
          <div className="flex w-[100%] items-center justify-start p-[10px] gap-[10px]">
            <img src="/assets/img6.png" className='productimg12 w-[60px] h-[70px]' alt="" />
            <img src="/assets/img6.png" className='productimg12 w-[60px] h-[70px]' alt="" />
            <img src="/assets/img6.png" className='productimg12 w-[60px] h-[70px]' alt="" />
          </div>
        </div>
        <div className='productinfo flex flex-col gap-[20px]'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-md font-semibold'>Printed Gym Relax-Fit T-Shirt</p>
            <Heart />
          </div>
          <div className='flex flex-col items-start jusify-center gap-[5px]'>
            <div className="prices w-full flex items-center justify-start gap-[20px]">
              <p className='text-2xl text-black font-semibold'>Rs. 599.00</p>
              <p className='text-md line-through text-gray-400 font-regular'>Rs. 899.00</p>
              <p className='text-xs font-semibold py-[3px] px-[5px] bg-black text-white '>30% OFF</p>
            </div>
            <p className='text-xs font-semibold text-gray-500'>Free Shipping over ₹999</p>
          </div>
          <div className='size w-full flex flex-col gap-[20px]'>
            <div className='w-full flex justify-between'>
              <p className='text-sm font-semibold'>Sizes</p>
              <div className='flex items-center justify-center gap-[5px] underline'>
                <Ruler size={14} />
                <p className='text-xs font-semibold'>Size Chart</p>
              </div>
            </div>
            <div className='flex w-full items-center justify-start flex-wrap gap-[20px]'>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>S</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>M</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>L</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>XL</div>
            </div>
          </div>
          <p className='font-light text-gray-500 text-xs'>Tip: Review the Size Chart before buying the Product</p>
          <div className='Buttons flex flex-col gap-[20px]'>
            <button className='w-full border border-black py-[10px] flex items-center justify-center gap-[10px]'>
              <ShoppingBag size={18} />
              <p className='text-sm font-semibold'>Add to Cart</p>
            </button>
            <button className='w-full bg-black text-white py-[10px] flex items-center justify-center gap-[10px]'>
              <p className='text-sm font-semibold'>Buy Now</p>
            </button>
          </div>
          <div className="shipping text-gray-500 flex flex-col items-start justify-start gap-2">
            <p className="text-sm font-bold">Shipping</p>
            <div className="text-xs flex flex-col items-start justify-start gap-1">
              <p>• <b>Cash on Delivery (COD):</b> ₹50</p>
              <p>• <b>Prepaid Orders:</b> ₹30</p>
              <p>• <b>Delivery Timeline:</b> 4 to 7 working days</p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-bold">Description</AccordionTrigger>
              <AccordionContent className="text-xs flex flex-col items-start justify-start gap-3">
                <div className="shipping text-black flex flex-col items-start justify-start gap-2">
                  <p className="text-xs font-semibold">Product Details</p>
                  <div className="text-xs flex flex-col items-start justify-start gap-1">
                    <p>• <b>Composition:</b> 100% Cotton <b>(French Terry)</b></p>
                    <p>• <b>GSM:</b> 250 GSM</p>
                    <p>• <b>Color:</b> Black</p>
                    <p>• <b>Country:</b> India</p>
                  </div>
                </div>
                <div className="shipping text-black flex flex-col items-start justify-start gap-2">
                  <p className="text-xs font-semibold">Size Details</p>
                  <div className="text-xs flex flex-col items-start justify-start gap-1">
                    <p>• Model (Height 6’1″) is wearing size L</p>
                    <p>• <b>Chest:</b> 37 inches</p>
                    <p>• <b>Waist:</b> 30 inches</p>
                    <p>• <b>Fit:</b> Oversized drop shoulder tee</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-bold">Wash & Care</AccordionTrigger>
              <AccordionContent className="text-xs">
                <div className="text-xs flex flex-col items-start justify-start gap-1">
                  <p>• Machine Wash</p>
                  <p>• Medium Iron</p>
                  <p>• Do not Bleach</p>
                  <p>• Wash with mild detergents</p>
                  <p>• Can be Dry Cleaned</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-bold">Return & Exchange Policy</AccordionTrigger>
              <AccordionContent className="text-xs">
                <div className="text-xs flex flex-col items-start justify-start gap-1">
                  <p>• <b>Return/Exchange Period:</b> Within 7 days of delivery</p>
                  <p>• <b>Product Condition:</b> Unworn, unwashed, with tags intact</p>
                  <p>• <b>Quality Check:</b> Defective products can be returned/exchanged</p>
                  <p>• <b>Reverse Shipping:</b> Customer pays return shipping, unless defective</p>
                  <p>• <b>Exchange Option:</b> Size/color exchange based on availability</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center justify-center mt-10">
            <div className="flex py-3 px-10 border border-black w-[40%] items-center justify-center gap-[10px]">
              <Share2 size={16} />
              <p className="text-sm font-medium">Share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page