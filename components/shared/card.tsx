import { Heart } from 'lucide-react';
import React from 'react'

interface CardBoxProps {
    name: string;
    price: number;
    discountedPrice?: number; // Optional discounted price
    image: string;
    tag: string;
}

const CardBox: React.FC<CardBoxProps> = ({
    name,
    price,
    discountedPrice,
    image,
    tag,
}) => {
    return (
        <div className='cardbox flex flex-col items-center justify-center gap-0 border-gray-300 relative'>
            <div className='cardtag absolute top-0 right-0 text-xs py-[2px] px-[5px] font-medium text-white bg-black'>{tag}</div>
            <img src={image} className='cardimg w-[20vw] object-contain' alt="" />
            <div className='w-full py-1.5 px-3 gap-2 flex flex-col justify-center'>
                <div className="flex flex w-[100%] gap-1">
                    <p className='text-md w-full text-left font-[600] truncate-text'>{name}</p>
                    <Heart color='gray' />
                </div>
                <div className='cardamount flex items-center gap-4 w-[100%] justify-start'>
                    <p className='text-sm font-[500]'>₹ {price}.00</p>
                    <p className='line-through text-xs text-gray-500'>₹ {discountedPrice}.00</p>
                </div>
            </div>
        </div>
    )
}

export default CardBox;
