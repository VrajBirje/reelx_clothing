"use client"
import CardBox from '@/components/shared/card';
import React from 'react'
import "../protect.css"

const prod = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const page = () => {
  return (
    <div className='wishlist flex py-[20px] justify-center bg-white 2xl:max-w-screen-xl mx-auto w-full flex-col items-center gap-[30px] '>
      <div className='w-full flex justify-between items-center'>
        <p className="heading text-xl font-bold">My Wishlist</p>
        <p>2 items</p>
      </div>
      <div className="wishcards gap-2 w-full flex flex-wrap justify-between">
        {prod.map((item) => (
          <div className='wishcard' key={item}>
            <CardBox
              name="Gym Reelx Fit T-shirt"
              price={1299}
              discountedPrice={999}
              image="/assets/img5.png"
              tag="Hot Deal"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page