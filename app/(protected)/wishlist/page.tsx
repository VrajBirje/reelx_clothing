"use client";
import CardBox from "@/components/shared/card";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "../protect.css";
import FlyingBird from "@/components/animatedLogo";
const WishlistPage = () => {
  const { user } = useUser();
  const customer_id = user?.id;
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customer_id) return;

    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlist/${customer_id}`);
        const data = await res.json();

        if (data.success) {
          setWishlistItems(data.products);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [customer_id]);

  // Callback function to remove product from wishlist UI after deletion
  const handleRemoveFromWishlist = (product_id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  return (
    <div className="wishlist flex py-[20px] flex-col bg-white px-[4%] w-full">
      <div className="w-full flex justify-between items-center mb-10">
        <p className="heading text-xl font-bold">My Wishlist</p>
        <p>{wishlistItems.length} items</p>
      </div>

      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FlyingBird />
        </div>
      ) : wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishcards w-full flex flex-wrap justify-start gap-x-[1.5vw] gap-y-1 w-full">
          {wishlistItems.map((item) => (
            <div className="wishcard" key={item.product_id}>
              <CardBox
                product_id={item.product_id}
                name={item.name}
                price={item.price}
                discountedPrice={item.discountedprice}
                image={item.images[0]}
                tag={item.tag}
                onRemove={handleRemoveFromWishlist} // Pass function to update state
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
