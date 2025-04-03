"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Ruler, Share2, ShoppingBag } from "lucide-react";
import React from "react";
import "../../product/product.css";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import FlyingBird from "@/components/animatedLogo";

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
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedRawTshirt, setSelectedRawTshirt] = useState<RawTshirt | null>(null);
  const { user } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const customer_id = user?.id;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50; // Minimum distance to consider it a swipe

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !product) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // Update selected image when currentImageIndex changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[currentImageIndex]);
    }
  }, [currentImageIndex, product]);

  useEffect(() => {
    if (!customer_id || !product) return;

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

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
          setSelectedImage(data.data.images[0]);
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

  const handleAddToCart = async (): Promise<boolean> => {
    if (!user) {
      toast.error("Please log in to add items to the cart!");
      router.push("/sign-in");
      return false;
    }

    if (!selectedRawTshirt) {
      toast.error("Please select a size before adding to cart!");
      return false;
    }

    if (selectedRawTshirt.quantity <= 0) {
      toast.error("Selected size is out of stock!");
      return false;
    }

    const customer_id = user.id;
    setAddingToCart(true);

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
        return true;
      } else {
        toast.error(data.message || "Failed to add to cart!");
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!");
      return false;
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please log in to proceed with your purchase!");
      router.push("/sign-in");
      return;
    }

    if (!selectedRawTshirt) {
      toast.error("Please select a size before proceeding!");
      return;
    }

    if (selectedRawTshirt.quantity <= 0) {
      toast.error("Selected size is out of stock!");
      return;
    }

    const success = await handleAddToCart();
    if (success) {
      router.push("/cart");
    }
  };

  const handleShare = async () => {
    try {
      const productUrl = `${window.location.origin}/product/${product?.product_id}`;
      await navigator.clipboard.writeText(productUrl);
      toast.success('Product link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Error copying to clipboard:', error);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><FlyingBird /></div>;
  if (!product) return <p>Product not found</p>;
  

  return (
    <div className='productmain flex py-[20px] justify-center bg-white px-[4%] w-full flex-col items-center gap-[10px]'>
      <p className='text-xs font-medium'>Home / Shop / <b>{product.name}</b></p>
      <div className='productmain2 w-full flex items-start justify-center mt-[20px] gap-[20px]'>
        <div className='productimgbox w-[68%] flex flex-wrap overflow-y-auto'>
          {product.images.map((image, index) => (
            <div key={index} className='productimg1 relative w-[50%]'>
              <Image
                src={image}
                className='absolute object-cover'
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        <div className='productimgbox2 w-[100%] flex flex-col'>
          <div
            className='productimg1 relative h-[50vh] w-[100%] overflow-hidden'
            ref={imageContainerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={selectedImage}
              className='mainphoneimg absolute object-cover transition-transform duration-300 ease-out'
              alt={product.name}
              fill
              sizes="100vw"
              style={{
                transform: touchEnd
                  ? `translateX(${touchStart && touchEnd ? touchStart - touchEnd : 0}px)`
                  : 'translateX(0)'
              }}
            />
            {/* Navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex w-[100%] items-center justify-start p-[10px] gap-[10px] overflow-x-auto">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`productimg12 relative w-[60px] h-[70px] cursor-pointer flex-shrink-0 ${currentImageIndex === index ? 'ring-2 ring-black' : ''
                  }`}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index);
                }}
              >
                <Image
                  src={image}
                  className='absolute object-cover'
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  sizes="60px"
                />
              </div>
            ))}
          </div>
        </div>
        <div className='productinfo flex flex-col gap-[20px]'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-md font-semibold'>{product.name}</h1>
            <div className="flex gap-2">
              <Share2
                onClick={handleShare}
                className="cursor-pointer text-gray-500 hover:text-black"
                size={18}
              />
              <Heart
                onClick={handleWishlistToggle}
                color={isInWishlist ? "red" : "gray"}
                fill={isInWishlist ? "red" : "transparent"}
                className="cursor-pointer"
                size={18}
              />
            </div>
          </div>
          <p className='text-xs font-semibold text-gray-500'>{product.description}</p>

          <div className='flex flex-col items-start jusify-center gap-[5px]'>
            <div className="prices w-full flex items-center justify-start gap-[20px]">
              <p className='text-2xl text-black font-semibold'>Rs. {product.discountedprice}</p>
              <p className='text-md line-through text-gray-400 font-regular'>Rs. {product.price}.00</p>
              <p className='text-xs font-semibold py-[3px] px-[5px] bg-black text-white'>{product.tag}</p>
            </div>
          </div>

          <div className='size w-full flex flex-col gap-[20px]'>
            <div className='w-full flex justify-between'>
              <p className='text-sm font-semibold'>Sizes</p>
              <div
                className='flex items-center justify-center gap-[5px] underline cursor-pointer'
                onClick={() => router.push('/size-chart')}
              >
                <Ruler size={14} />
                <p className='text-xs font-semibold'>Size Chart</p>
              </div>
            </div>
            <div className='flex w-full items-center justify-start flex-wrap gap-[20px]'>
              {product.raw_tshirt_ids.map((rawTshirt) => (
                <button
                  key={rawTshirt.id}
                  className={`border border-gray-300 flex items-center justify-center w-[80px] h-[37px] font-regular text-md ${selectedSize === rawTshirt.size ? "bg-gray-200" : ""
                    } ${rawTshirt.quantity === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
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
            <div className="w-full flex flex-col items-start justify-center">
              {!selectedRawTshirt && <p className="text-gray-500 text-sm font-semibold">Please select a size first</p>}
              <button
                className="w-full border border-black py-[10px] flex items-center justify-center gap-[10px] mb-5 hover:bg-black hover:text-white transition-colors"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <FlyingBird />
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <p className="text-sm font-semibold">Add to Cart</p>
                  </>
                )}
              </button>
              <button
                className="w-full bg-black text-white py-[10px] flex items-center justify-center gap-[10px] hover:bg-gray-800 transition-colors"
                onClick={handleBuyNow}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <FlyingBird />
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <p className="text-sm font-semibold">Buy Now</p>
                  </>
                )}
              </button>
            </div>
            {/* <button className='w-full bg-black text-white py-[10px] flex items-center justify-center gap-[10px]'>
              <p className='text-sm font-semibold'>Buy Now</p>
              </button> */}
          </div>
          <div className="shipping text-gray-500 flex flex-col items-start justify-start gap-2">
            <p className="text-sm font-bold">Shipping</p>
            <div className="text-xs flex flex-col items-start justify-start gap-1">
              {/* <p>• <b>Cash on Delivery (COD):</b> ₹50</p>
              <p>• <b>Prepaid Orders:</b> ₹30</p> */}
              <p>• <b>Delivery Timeline:</b> 4 to 7 working days</p>
            </div>
          </div>
          <p className="text-xs text-black-500"><b>About Product: </b>{product.description}</p>
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
                    <p>• Model (Height 6&apos;1″) is wearing size L</p>
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
            <div
              className="flex py-3 px-10 border border-black w-[40%] items-center justify-center gap-[10px] cursor-pointer"
              onClick={handleShare}
            >
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