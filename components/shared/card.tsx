import { Heart } from 'lucide-react';
import React from 'react'

const CardBox = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-0 border border-gray-300 relative'>
            <div className='absolute top-0 right-0 text-xs py-[2px] px-[5px] font-medium text-white bg-black'>Hot Deal</div>
            <img src="/assets/img4.png" className='h-[350px] w-[300px] ' alt="" />
            <div className='w-full py-1.5 px-3 flex justify-between'>
                <div className="flex flex-col gap-2">
                    <p className='text-sm w-full text-left font-light'>Gym Reelx Fit T-shirt</p>
                    <div className='flex gap-2'>
                        <p className='text-md font-normal'>₹ 1299/-</p>
                        <p className='line-through text-sm text-gray-500'>₹ 1299/-</p>
                    </div>
                </div>
                <Heart />
            </div>
        </div>
    )
}

export default CardBox;
