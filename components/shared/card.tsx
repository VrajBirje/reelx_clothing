"use client";
// import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
// import {useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Clerk user hook
// import toast from "react-hot-toast";

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

  // useEffect(() => {
  //   if (!customer_id) return;

  //   // Fetch wishlist to check if the product is already added
  //   const fetchWishlist = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlist/${customer_id}`);
  //       const data = await res.json();

  //       if (data.success) {
  //         setIsInWishlist(data.products.some((p: any) => p.product_id === product_id));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching wishlist:", error);
  //     }
  //   };

  //   fetchWishlist();
  // }, [customer_id, product_id]);

  // const handleWishlistToggle = async (e: React.MouseEvent) => {
  //   e.stopPropagation();

  //   if (!customer_id) {
  //     toast.error("Please sign in to use the wishlist!");
  //     // router.push("/sign-in");
  //     return;
  //   }

  //   try {
  //     const url = `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${isInWishlist ? "remove" : "add"}`;
  //     const method = isInWishlist ? "DELETE" : "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ customer_id, product_id }),
  //     });

  //     const data = await res.json();

  //     if (data.success) {
  //       setIsInWishlist(!isInWishlist);
  //       onRemove?.(product_id);
  //       toast.success(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
  //     }
  //   } catch (error) {
  //     console.error("Wishlist update error:", error);
  //   }
  // };

  return (
    <div onClick={() => router.push(`/product/${product_id}`)} className="cardbox flex flex-col items-center justify-center cursor-pointer gap-0 border-gray-300 relative">
      <div className="cardtag absolute top-0 right-0 text-xs py-[2px] px-[5px] font-medium text-white bg-black">{tag}</div>
      <div className="cardimg w-[21vw] object-contain relative">
        <Image src={image} className="absolute" alt="" fill={true} />
      </div>
      <div className="w-full py-1.5 px-3 gap-2 flex flex-col justify-center">
        <div className="flex flex w-[100%] gap-1">
          <p className="text-md w-full text-left font-[600] truncate-text">{name}</p>
          {/* <Heart
            onClick={handleWishlistToggle}
            color={isInWishlist ? "red" : "gray"}
            fill={isInWishlist ? "red" : "transparent"}
            className="cursor-pointer"
          /> */}
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

