import React from 'react'
import CardBox from '@/components/shared/card'
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Trending = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-[30px] mt-20">
            <div className="text-2xl font-light">
                BEST SELLERS
            </div>
            <div className='flex w-full justify-between'>
                <CardBox />
                <CardBox />
                <CardBox />
                <CardBox />
            </div>
            <div className='border border-black border-solid py-2 px-4 flex items-center justify-center gap-3'>
                <p className='text-md font-light'>SEE MORE</p>
                <ArrowRight/>
            </div>
        </div>
    )
}

export default Trending;
