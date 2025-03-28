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
// "use client"

// import type React from "react"
// import { useRef } from "react"
// import { motion } from "framer-motion"
// import CardBox from "@/components/shared/card"
// import { ArrowLeft, ArrowRight } from "lucide-react"

// interface TrendingProps {
//   title: string
// }

// const Trending: React.FC<TrendingProps> = ({ title }) => {
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
//     }
//   }

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
//     }
//   }

//   const handleWishlistToggle = (productId: number) => {
//     // This would typically interact with your API
//     // For now, just show a toast message
//     import("react-hot-toast").then(({ default: toast }) => {
//       toast.success(`Toggled wishlist for product ${productId}`)
//     })
//   }

//   return (
//     <div className="flex flex-col items-center px-[30px] justify-center gap-[30px] mt-20">
//       <div className="relative">
//         <motion.h2
//           className="text-2xl font-light tracking-widest"
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {title}
//         </motion.h2>
//         <motion.div
//           className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black"
//           initial={{ width: 0 }}
//           whileInView={{ width: 64 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         />
//       </div>

//       <div className="w-full relative">
//         <motion.button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <ArrowLeft size={20} />
//         </motion.button>

//         <div
//           ref={scrollRef}
//           className="trend flex w-full gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
//             className="flex gap-6"
//           >
//             <CardBox
//               product_id={1}
//               name="Gym Relax Fit T-shirt"
//               price={1299}
//               discountedPrice={999}
//               image="/assets/img6.png"
//               tag="Hot Deal"
//               isInWishlist={false}
//               onWishlistToggle={handleWishlistToggle}
//             />
//             <CardBox
//               product_id={2}
//               name="Premium Cotton T-shirt"
//               price={1499}
//               discountedPrice={1199}
//               image="/assets/img4.png"
//               tag="Best Seller"
//               isInWishlist={false}
//               onWishlistToggle={handleWishlistToggle}
//             />
//             <CardBox
//               product_id={3}
//               name="Athletic Fit Tee"
//               price={1199}
//               discountedPrice={899}
//               image="/assets/img4.png"
//               tag="New"
//               isInWishlist={false}
//               onWishlistToggle={handleWishlistToggle}
//             />
//             <CardBox
//               product_id={4}
//               name="Performance Sport T-shirt"
//               price={1399}
//               discountedPrice={1099}
//               image="/assets/img4.png"
//               tag="Limited"
//               isInWishlist={false}
//               onWishlistToggle={handleWishlistToggle}
//             />
//             <CardBox
//               product_id={5}
//               name="Comfort Stretch T-shirt"
//               price={1299}
//               discountedPrice={999}
//               image="/assets/img6.png"
//               tag="Sale"
//               isInWishlist={false}
//               onWishlistToggle={handleWishlistToggle}
//             />
//           </motion.div>
//         </div>

//         <motion.button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <ArrowRight size={20} />
//         </motion.button>
//       </div>

//       <motion.div className="group cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//         <div className="border border-black border-solid py-2 px-6 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300">
//           <p className="text-md font-light tracking-wider">SEE MORE</p>
//           <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//             <ArrowRight size={18} />
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Trending

