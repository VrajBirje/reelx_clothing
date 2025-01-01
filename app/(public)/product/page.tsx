import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Heart, Ruler, ShoppingBag } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex pt-[20px] justify-center bg-white 2xl:max-w-screen-xl mx-auto w-full flex-col items-center gap-[10px] '>
      <p className='text-xs font-medium'>Home / Relax-Fit / Gym-Wear / Printed Oversized T-Shirt</p>
      <div className='w-full flex items-start justify-center mt-[20px] gap-[20px]'>
        <div className='product-images w-[68%] flex flex-wrap overflow-y-auto'>
          <img src="/assets/img6.png" className='h-[90vh] w-[50%]' alt="" />
          <img src="/assets/img8.png" className='h-[90vh] w-[50%]' alt="" />
          <img src="/assets/img6.png" className='h-[90vh] w-[50%]' alt="" />
        </div>
        <div className='product-info w-[32%] h-[90vh] flex flex-col gap-[20px]'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-md font-semibold'>Printed Gym Relax-Fit T-Shirt</p>
            <Heart />
          </div>
          <div className='flex flex-col items-start jusify-center gap-[5px]'>
            <div className="prices w-full flex items-center justify-start gap-[20px]">
              <p className='text-xl text-black font-regular'>Rs. 599.00</p>
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
            <div className='flex w-full items-center justify-start gap-[20px]'>
              <div className='border border-gray-300 py-[5px] px-[30px] font-regular text-md'>S</div>
              <div className='border border-gray-300 py-[5px] px-[30px] font-regular text-md'>M</div>
              <div className='border border-gray-300 py-[5px] px-[30px] font-regular text-md'>L</div>
              <div className='border border-gray-300 py-[5px] px-[30px] font-regular text-md'>XL</div>
            </div>
          </div>
          <p className='font-light text-gray-500 text-xs'>Tip: Review the Size Chart Before Buying any Product</p>
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
              <AccordionTrigger className="text-sm">Is it accessible?</AccordionTrigger>
              <AccordionContent className="text-xs">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <p>share</p>
        </div>
      </div>
    </div>
  )
}

export default page