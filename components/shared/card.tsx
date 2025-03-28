"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Clerk user hook
import toast from "react-hot-toast";

interface CardBoxProps {
  product_id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  tag: string;
  onRemove?: (product_id: number) => void;
}

const CardBox: React.FC<CardBoxProps> = ({ product_id, name, price, discountedPrice, image, tag, onRemove }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const customer_id = user?.id;

  useEffect(() => {
    if (!customer_id) return;

    // Fetch wishlist to check if the product is already added
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlist/${customer_id}`);
        const data = await res.json();

        if (data.success) {
          setIsInWishlist(data.products.some((p: any) => p.product_id === product_id));
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [customer_id, product_id]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!customer_id) {
      toast.error("Please sign in to use the wishlist!");
      // router.push("/sign-in");
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${isInWishlist ? "remove" : "add"}`;
      const method = isInWishlist ? "DELETE" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id, product_id }),
      });

      const data = await res.json();

      if (data.success) {
        setIsInWishlist(!isInWishlist);
        onRemove?.(product_id);
        toast.success(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist update error:", error);
    }
  };

  return (
    <div onClick={() => router.push(`/product/${product_id}`)} className="cardbox flex flex-col items-center justify-center cursor-pointer gap-0 border-gray-300 relative">
      <div className="cardtag absolute top-0 right-0 text-xs py-[2px] px-[5px] font-medium text-white bg-black">{tag}</div>
      <div className="cardimg w-[21vw] object-contain relative">
        <Image src={image} className="absolute" alt="" fill={true} />
      </div>
      <div className="w-full py-1.5 px-3 gap-2 flex flex-col justify-center">
        <div className="flex flex w-[100%] gap-1">
          <p className="text-md w-full text-left font-[600] truncate-text">{name}</p>
          <Heart
            onClick={handleWishlistToggle}
            color={isInWishlist ? "red" : "gray"}
            fill={isInWishlist ? "red" : "transparent"}
            className="cursor-pointer"
          />
        </div>
        <div className="cardamount flex items-center gap-4 w-[100%] justify-start">
          <p className="text-sm font-[500]">₹ {price}.00</p>
          {discountedPrice && <p className="line-through text-xs text-gray-500">₹ {discountedPrice}.00</p>}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
// "use client"

// import { Heart, ShoppingBag, Eye } from "lucide-react"
// import Image from "next/image"
// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import toast from "react-hot-toast"
// import { motion } from "framer-motion"

// interface CardBoxProps {
//   product_id: number
//   name: string
//   price: number
//   discountedPrice?: number
//   image: string
//   tag: string
//   isInWishlist?: boolean
//   onWishlistToggle?: (product_id: number) => void
//   onRemove?: (product_id: number) => void
// }

// const CardBox: React.FC<CardBoxProps> = ({
//   product_id,
//   name,
//   price,
//   discountedPrice,
//   image,
//   tag,
//   isInWishlist = false,
//   onWishlistToggle,
//   onRemove,
// }) => {
//   const router = useRouter()
//   const [isHovered, setIsHovered] = useState(false)
//   const [localWishlistState, setLocalWishlistState] = useState(isInWishlist)

//   const handleWishlistToggle = async (e: React.MouseEvent) => {
//     e.stopPropagation()

//     // Update local state immediately for responsive UI
//     setLocalWishlistState(!localWishlistState)

//     // If parent provided a handler, call it
//     if (onWishlistToggle) {
//       onWishlistToggle(product_id)
//     } else {
//       // Fallback behavior if no handler provided
//       toast.success(localWishlistState ? "Removed from wishlist!" : "Added to wishlist!")

//       if (onRemove && localWishlistState) {
//         onRemove(product_id)
//       }
//     }
//   }

//   // Calculate discount percentage
//   const discountPercentage =
//     discountedPrice && price > discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : null

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       whileHover={{ y: -5 }}
//       transition={{ duration: 0.3 }}
//       className="cardbox flex flex-col items-center justify-center cursor-pointer gap-0 border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white snap-start min-w-[250px] md:min-w-[280px]"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => router.push(`/product/${product_id}`)}
//     >
//       <div className="relative w-full h-[300px] overflow-hidden">
//         {/* Tag */}
//         <div
//           className={`cardtag absolute top-3 right-3 z-10 text-xs py-1 px-3 font-medium text-white rounded-sm ${
//             tag === "Hot Deal"
//               ? "bg-red-500"
//               : tag === "New"
//                 ? "bg-green-500"
//                 : tag === "Best Seller"
//                   ? "bg-amber-500"
//                   : tag === "Limited"
//                     ? "bg-purple-500"
//                     : "bg-black"
//           }`}
//         >
//           {tag}
//         </div>

//         {/* Discount badge */}
//         {discountPercentage && (
//           <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-bold py-1 px-2 rounded-sm">
//             -{discountPercentage}%
//           </div>
//         )}

//         {/* Product image */}
//         <div className="relative w-full h-full">
//           <Image
//             src={image || "/placeholder.svg"}
//             alt={name}
//             fill={true}
//             className={`object-contain transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
//           />
//         </div>

//         {/* Quick action buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
//           transition={{ duration: 0.3 }}
//           className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4"
//         >
//           {/* <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: "#000" }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-white text-gray-800 hover:text-white p-2 rounded-full shadow-md"
//             onClick={(e) => {
//               e.stopPropagation()
//               toast.success("Added to cart!")
//             }}
//           >
//             <ShoppingBag size={18} />
//           </motion.button> */}

//           <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: localWishlistState ? "#f43f5e" : "#000" }}
//             whileTap={{ scale: 0.9 }}
//             onClick={handleWishlistToggle}
//             className={`p-2 rounded-full shadow-md ${
//               localWishlistState ? "bg-red-500 text-white" : "bg-white text-gray-800 hover:text-white"
//             }`}
//           >
//             <Heart size={18} fill={localWishlistState ? "white" : "transparent"} />
//           </motion.button>

//           {/* <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: "#000" }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-white text-gray-800 hover:text-white p-2 rounded-full shadow-md"
//             onClick={(e) => {
//               e.stopPropagation()
//               router.push(`/product/${product_id}`)
//             }}
//           >
//             <Eye size={18} />
//           </motion.button> */}
//         </motion.div>
//       </div>

//       <div className="w-full py-4 px-4 gap-2 flex flex-col justify-center">
//         <h3 className="text-md font-medium text-gray-800 truncate">{name}</h3>

//         <div className="cardamount flex items-center gap-3 w-full justify-start">
//           <p className="text-lg font-semibold">₹{discountedPrice || price}</p>
//           {discountedPrice && price > discountedPrice && <p className="line-through text-sm text-gray-500">₹{price}</p>}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default CardBox

