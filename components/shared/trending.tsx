// import React from 'react'
// import CardBox from '@/components/shared/card'
// import { ArrowLeft, ArrowRight } from 'lucide-react';

// const Trending = () => {
//     return (
//         <div className="flex flex-col items-center px-[30px] justify-center gap-[30px] mt-20">
//             <div className="text-2xl font-light">
//                 BEST SELLERS
//             </div>
//             <div className='trend flex w-full justify-between'>
//                 <CardBox
//                     product_id={1}
//                     name="Gym Reelx Fit T-shirt"
//                     price={1299}
//                     discountedPrice={999}
//                     image="/assets/img6.png"
//                     tag="Hot Deal"
//                 />
//                 <CardBox
//                     product_id={1}
//                     name="Gym Reelx Fit T-shirt"
//                     price={1299}
//                     discountedPrice={999}
//                     image="/assets/img4.png"
//                     tag="Hot Deal"
//                 />
//                 <CardBox
//                     product_id={1}
//                     name="Gym Reelx Fit T-shirt"
//                     price={1299}
//                     discountedPrice={999}
//                     image="/assets/img4.png"
//                     tag="Hot Deal"
//                 />
//                 <CardBox
//                     product_id={1}
//                     name="Gym Reelx Fit T-shirt"
//                     price={1299}
//                     discountedPrice={999}
//                     image="/assets/img4.png"
//                     tag="Hot Deal"
//                 />
//             </div>
//             <div className='border border-black border-solid py-2 px-4 flex items-center justify-center gap-3'>
//                 <p className='text-md font-light'>SEE MORE</p>
//                 <ArrowRight />
//             </div>
//         </div>
//     )
// }

// export default Trending;
"use client"

import type React from "react"
import { useRef } from "react"
import { motion } from "framer-motion"
import CardBox from "@/components/shared/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface TrendingProps {
  title: string
}

const products = [
  {
    product_id: 2,
    name: "F1 - Lewis Hamilton Born to Win",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743343004/8_mxkyhl.png",
    tag: "sale"
  },
  {
    product_id: 3,
    name: "Monkey D Luffy - One Piece Gear 5",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743342998/2_uljdvr.png",
    tag: "sale"
  },
  {
    product_id: 4,
    name: "Zoro - One Piece",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743343000/4_uts4gs.png",
    tag: "sale"
  },
  {
    product_id: 5,
    name: "Thor - God of Thunder",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743342993/12_v9da01.png",
    tag: "sale"
  },
  {
    product_id: 6,
    name: "Ronaldo - GOAT Mode",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743342363/20_wia7c8.png",
    tag: "sale"
  },
  {
    product_id: 7,
    name: "The Unbreakable Warrior KARNA",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743343001/6_v5bcws.png",
    tag: "sale"
  },
  {
    product_id: 8,
    name: "Dirty Money",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743342993/14_hpavon.png",
    tag: "sale"
  },
  {
    product_id: 9,
    name: "Millionaire's Mindset",
    price: 1299,
    discountedPrice: 649,
    image: "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743342364/18_cownnt.png",
    tag: "sale"
  }
]

const Trending: React.FC<TrendingProps> = ({ title }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const filteredProducts = title === "BEST SELLING" ? products.slice(0, 4) : products.slice(4, 8);

  return (
    <div className="flex flex-col items-center px-[30px] justify-center gap-[30px] mt-20">
      <div className="relative">
        <motion.h2
          className="text-2xl font-light tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <div className="w-full relative">
        <motion.button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </motion.button>

        <div
          ref={scrollRef}
          className="flex w-full gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProducts.map(product => (
            <CardBox
              key={product.product_id}
              product_id={product.product_id}
              name={product.name}
              price={product.discountedPrice}
              discountedPrice={product.price}
              image={product.image}
              tag={product.tag}
            />
          ))}
        </div>

        <motion.button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  )
}

export default Trending;


