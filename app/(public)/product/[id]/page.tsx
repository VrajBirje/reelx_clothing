"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Ruler, Share2, ShoppingBag } from "lucide-react";
import React from "react";
import "../../product/product.css";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { redirectToSignIn, useUser } from "@clerk/nextjs";

interface RawTshirt {
  id: number;
  quantity: number;
  size: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  discountedprice: number;
  discount: number;
  category_id: number;
  tag: string;
  images: string[];
  date_added: string;
  date_updated: string;
  raw_tshirt_ids: RawTshirt[];
  color: string;
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedRawTshirt, setSelectedRawTshirt] = useState<RawTshirt | null>(null);
  const { user } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const customer_id = user?.id;

  useEffect(() => {
    if (!customer_id || !product) return;

    // Fetch wishlist to check if the product is already added
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlist/${customer_id}`);
        const data = await res.json();

        if (data.success) {
          setIsInWishlist(data.products.some((p: any) => p.product_id === product.product_id));
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [customer_id, product]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!customer_id) {
      toast.error("Please sign in to use the wishlist!");
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${isInWishlist ? "remove" : "add"}`;
      const method = isInWishlist ? "DELETE" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id, product_id: product?.product_id }),
      });

      const data = await res.json();

      if (data.success) {
        setIsInWishlist(!isInWishlist);
        toast.success(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist update error:", error);
    }
  };



  console.log(selectedSize);
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (selectedSize && product) {
      const rawTshirt = product.raw_tshirt_ids.find((item) => item.size === selectedSize);
      setSelectedRawTshirt(rawTshirt || null);
    }
  }, [selectedSize, product]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to the cart!");
      return router.push("/sign-in"); // Redirect only when clicking Add to Cart
    }


    if (!selectedRawTshirt) {
      toast.error("Please select a valid size before adding to cart!");
      return;
    }

    if (selectedRawTshirt.quantity <= 0) {
      toast.error("Selected size is out of stock!");
      return;
    }

    const customer_id = user.id; // Replace with actual Clerk ID

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id,
          raw_tshirt_id: selectedRawTshirt.id,
          product_id: product?.product_id,
          size: selectedSize,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Added to cart successfully!");
      } else {
        toast.error(data.message || "Failed to add to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className='productmain flex py-[20px] justify-center bg-white px-[4%] w-full flex-col items-center gap-[10px] '>
      <p className='text-xs font-medium'>Home / Shop / Gym-Wear / <b>{product.name}</b></p>
      <div className='productmain2 w-full flex items-start justify-center mt-[20px] gap-[20px]'>
        <div className='productimgbox w-[68%] flex flex-wrap overflow-y-auto'>
          <div className='productimg1 relative w-[50%]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
          <div className='productimg1 relative w-[50%]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
          <div className='productimg1 relative w-[50%]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
        </div>
        <div className='productimgbox2 w-[100%] flex flex-col '>
          <div className='productimg1 relative h-[50vh] w-[100%]'><Image src="/assets/img6.png" className='absolute' alt="" fill={true} /></div>
          <div className="flex w-[100%] items-center justify-start p-[10px] gap-[10px]">
            <div className='productimg12 relative w-[60px] h-[70px]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
            <div className='productimg12 relative w-[60px] h-[70px]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
            <div className='productimg12 relative w-[60px] h-[70px]'><Image src={product.images[0]} className='absolute' alt="" fill={true} /></div>
          </div>
        </div>
        <div className='productinfo flex flex-col gap-[20px]'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-md font-semibold'>{product.name}</p>
            <Heart
              onClick={handleWishlistToggle}
              color={isInWishlist ? "red" : "gray"}
              fill={isInWishlist ? "red" : "transparent"}
              className="cursor-pointer"
            />

          </div>
          <div className='flex flex-col items-start jusify-center gap-[5px]'>
            <div className="prices w-full flex items-center justify-start gap-[20px]">
              <p className='text-2xl text-black font-semibold'>Rs. {product.discountedprice}</p>
              <p className='text-md line-through text-gray-400 font-regular'>Rs. {product.price}.00</p>
              <p className='text-xs font-semibold py-[3px] px-[5px] bg-black text-white '>30% OFF</p>
            </div>
            <p className='text-xs font-semibold text-gray-500'>Free Shipping over ₹999</p>
          </div>
          <div className='size w-full flex flex-col gap-[20px]'>
            <div className='w-full flex justify-between'>
              <p className='text-sm font-semibold'>Sizes</p>
              <div className='flex items-center justify-center gap-[5px] underline'>
                <Ruler size={14} />
                <p className='text-xs font-semibold'>Size Chart</p>
              </div>
            </div>
            <div className='flex w-full items-center justify-start flex-wrap gap-[20px]'>
              {/* <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>S</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>M</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>L</div>
              <div className='border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md'>XL</div> */}
              {product.raw_tshirt_ids.map((rawTshirt) => (
                <button
                  key={rawTshirt.id}
                  className={`border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md ${selectedSize === rawTshirt.size ? "bg-gray-200" : ""
                    } ${rawTshirt.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setSelectedSize(rawTshirt.size)}
                  disabled={rawTshirt.quantity === 0}
                >
                  {rawTshirt.size}
                </button>
              ))}
            </div>
          </div>
          <p className='font-bold text-gray-500 text-xs'>Tip: Review the Size Chart before buying the Product</p>
          <div className='Buttons flex flex-col gap-[20px]'>
            {/* <button className='w-full border border-black py-[10px] flex items-center justify-center gap-[10px]'>
              <ShoppingBag size={18} />
              <p className='text-sm font-semibold'>Add to Cart</p>
            </button> */}
            <button
              className="w-full border border-black py-[10px] flex items-center justify-center gap-[10px]
              disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!selectedRawTshirt || selectedRawTshirt.quantity === 0}
            >
              <ShoppingBag size={18} />
              <p className="text-sm font-semibold">Add to Cart</p>
            </button>
            <button className='w-full bg-black text-white py-[10px] flex items-center justify-center gap-[10px]'>
              <p className='text-sm font-semibold'>Buy Now</p>
            </button>
          </div>
          <div className="shipping text-gray-500 flex flex-col items-start justify-start gap-2">
            <p className="text-sm font-bold">Shipping</p>
            <div className="text-xs flex flex-col items-start justify-start gap-1">
              <p>• <b>Cash on Delivery (COD):</b> ₹50</p>
              <p>• <b>Prepaid Orders:</b> ₹30</p>
              <p>• <b>Delivery Timeline:</b> 4 to 7 working days</p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-bold">Description</AccordionTrigger>
              <AccordionContent className="text-xs flex flex-col items-start justify-start gap-3">
                <div className="shipping text-black flex flex-col items-start justify-start gap-2">
                  <p className="text-xs font-semibold">Product Details</p>
                  <div className="text-xs flex flex-col items-start justify-start gap-1">
                    <p>• <b>Composition:</b> 100% Cotton <b>(French Terry)</b></p>
                    <p>• <b>GSM:</b> 250 GSM</p>
                    <p>• <b>Color:</b> Black</p>
                    <p>• <b>Country:</b> India</p>
                  </div>
                </div>
                <div className="shipping text-black flex flex-col items-start justify-start gap-2">
                  <p className="text-xs font-semibold">Size Details</p>
                  <div className="text-xs flex flex-col items-start justify-start gap-1">
                    <p>• Model (Height 6’1″) is wearing size L</p>
                    <p>• <b>Chest:</b> 37 inches</p>
                    <p>• <b>Waist:</b> 30 inches</p>
                    <p>• <b>Fit:</b> Oversized drop shoulder tee</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-bold">Wash & Care</AccordionTrigger>
              <AccordionContent className="text-xs">
                <div className="text-xs flex flex-col items-start justify-start gap-1">
                  <p>• Machine Wash</p>
                  <p>• Medium Iron</p>
                  <p>• Do not Bleach</p>
                  <p>• Wash with mild detergents</p>
                  <p>• Can be Dry Cleaned</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-bold">Return & Exchange Policy</AccordionTrigger>
              <AccordionContent className="text-xs">
                <div className="text-xs flex flex-col items-start justify-start gap-1">
                  <p>• <b>Return/Exchange Period:</b> Within 7 days of delivery</p>
                  <p>• <b>Product Condition:</b> Unworn, unwashed, with tags intact</p>
                  <p>• <b>Quality Check:</b> Defective products can be returned/exchanged</p>
                  <p>• <b>Reverse Shipping:</b> Customer pays return shipping, unless defective</p>
                  <p>• <b>Exchange Option:</b> Size/color exchange based on availability</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center justify-center mt-10">
            <div className="flex py-3 px-10 border border-black w-[40%] items-center justify-center gap-[10px]">
              <Share2 size={16} />
              <p className="text-sm font-medium">Share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page