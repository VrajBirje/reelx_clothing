import React from 'react'
import CardBox from '@/components/shared/card'
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Trending = () => {
    return (
        <div className="flex flex-col items-center px-[30px] justify-center gap-[30px] mt-20">
            <div className="text-2xl font-light">
                BEST SELLERS
            </div>
            <div className='trend flex w-full justify-between'>
                <CardBox
                    product_id={1}
                    name="Gym Reelx Fit T-shirt"
                    price={1299}
                    discountedPrice={999}
                    image="/assets/img6.png"
                    tag="Hot Deal"
                />
                <CardBox
                    product_id={1}
                    name="Gym Reelx Fit T-shirt"
                    price={1299}
                    discountedPrice={999}
                    image="/assets/img4.png"
                    tag="Hot Deal"
                />
                <CardBox
                    product_id={1}
                    name="Gym Reelx Fit T-shirt"
                    price={1299}
                    discountedPrice={999}
                    image="/assets/img4.png"
                    tag="Hot Deal"
                />
                <CardBox
                    product_id={1}
                    name="Gym Reelx Fit T-shirt"
                    price={1299}
                    discountedPrice={999}
                    image="/assets/img4.png"
                    tag="Hot Deal"
                />
            </div>
            <div className='border border-black border-solid py-2 px-4 flex items-center justify-center gap-3'>
                <p className='text-md font-light'>SEE MORE</p>
                <ArrowRight />
            </div>
        </div>
    )
}

export default Trending;
