import { Heart } from 'lucide-react';
import React from 'react'

const CardBox = () => {
    return (
        <div className='cardbox flex flex-col items-center justify-center gap-0 border border-gray-300 relative'>
            <div className='cardtag absolute bottom-0 right-0 text-xs py-[2px] px-[5px] font-medium text-white bg-black'>Hot Deal</div>
            <img src="/assets/img4.png" className='cardimg h-[350px] w-[280px] ' alt="" />
            <div className='w-full py-1.5 px-3 gap-2 flex flex-col justify-center'>
                <div className="flex flex w-[100%] gap-1">
                    <p className='text-md w-full text-left font-[600] truncate-text'>Gym Reelx Fit T-shirt</p>
                    <Heart color='gray' />
                </div>
                <div className='cardamount flex items-center gap-2 w-[100%] justify-start'>
                    <p className='text-sm font-[500]'>₹ 1299.00</p>
                    <p className='line-through text-xs text-gray-500'>₹ 1299.00</p>
                </div>
            </div>
        </div>
    )
}

export default CardBox;
