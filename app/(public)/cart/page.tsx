"use client";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  id: string;
}

interface CartItem {
  product_id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  discountedprice: number;
  images: string[];
  quantity: number;
  raw_tshirt: { quantity: number }; // Inventory quantity
  isWishlisted?: boolean; // New field to track wishlist status
}

const Page = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; product_id: number | null }>({
    show: false,
    product_id: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserData(parsedData);
      fetchCartItems(parsedData.id);
      fetchWishlist(parsedData.id);
    }
  }, []);

  // Fetch Cart Items
  const fetchCartItems = async (userId: string) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/cart/${userId}`);
      setCartItems(data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlist/${userId}`);
      const data = await res.json();

      if (data.success) {
        const wishlistState: { [key: number]: boolean } = {};
        data.products.forEach((p: any) => {
          wishlistState[p.product_id] = true;
        });
        setWishlist(wishlistState);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Toggle Wishlist Function
  const handleWishlistToggle = async (product_id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userData) {
      toast.error("Please sign in to use the wishlist!");
      return;
    }

    const isCurrentlyWishlisted = wishlist[product_id] || false;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${isCurrentlyWishlisted ? "remove" : "add"}`;
    const method = isCurrentlyWishlisted ? "DELETE" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: userData.id, product_id }),
      });

      const data = await res.json();

      if (data.success) {
        setWishlist((prev) => ({
          ...prev,
          [product_id]: !isCurrentlyWishlisted, // Toggle wishlist state
        }));
        toast.success(isCurrentlyWishlisted ? "Removed from wishlist!" : "Added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist update error:", error);
      toast.error("Failed to update wishlist!");
    }
  };

  // Update Cart Quantity API Call
  const updateCartQuantity = async (product_id: number, size: string, quantity: number) => {
    if (!userData) return;

    setLoadingStates((prev) => ({ ...prev, [product_id]: true }));

    try {
      const response = await axios.put("http://localhost:5000/api/cart/cart/update", {
        customer_id: userData.id,
        product_id,
        size,
        quantity,
      });

      if (response.data.success) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product_id === product_id ? { ...item, quantity } : item
          )
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      alert("Failed to update quantity");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [product_id]: false }));
    }
  };

  const deleteCartItem = async () => {
    if (!userData || deleteModal.product_id === null) return;

    setLoadingStates((prev) => ({ ...prev, [deleteModal.product_id!]: true }));

    try {
      const response = await axios.delete("http://localhost:5000/api/cart/cart/remove", {
        data: {
          customer_id: userData.id,
          product_id: deleteModal.product_id,
        },
      });

      if (response.data.success) {
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== deleteModal.product_id)
        );
        setDeleteModal({ show: false, product_id: null });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Failed to delete item");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [deleteModal.product_id!]: false }));
    }
  };


  const shipping = 99.0;
  const discount = 199.0;

  // Calculate total price
  const productTotal = cartItems.reduce((total, product) => total + product.discountedprice * product.quantity, 0);

  // Calculate final amount
  const finalAmount = productTotal + shipping - discount;

  return (
    <div className="cart flex py-[20px] justify-center bg-white 2xl:max-w-screen-xl mx-auto w-full flex-col items-center gap-[30px]">
      <div className="carttopmobile w-full flex justify-between items-center gap-2 p-2 border-b-[1px] border-gray">
        <div className="flex flex-col w-[40%] gap-0">
          <p className="text-xs font-light">Total :</p>
          <p className="text-l font-bold">₹ {finalAmount}/-</p>
        </div>
        <button className="w-full text-sm font-semibold border border-black bg-black flex items-center justify-center text-white py-2 gap-3">
          CHECKOUT
        </button>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="heading text-xl font-bold">My Cart</p>
        <p>{cartItems.length} items</p>
      </div>
      <div className="cartlr w-full flex justify-between items-start">
        <div className="cartleft products w-[60%] border border-black">
          {cartItems.map((product) => (
            <div className="w-full relative" key={product.product_id}>
              <div className="product flex items-center p-[16px] gap-[20px]">
                <div className="asp w-[100px] relative">
                  <Image
                    className="absolute w-[100%] h-[100%]"
                    src={product.images[0]}
                    alt={product.name}
                    fill={true}
                  />
                </div>
                <div className="flex h-[150px] flex-col justify-between gap-2 w-full">
                  <div className="w-full flex flex-col gap-2 justify-start">
                    <div className="w-full flex items-center justify-between">
                      <p className="cartcardname text-sm font-bold truncate-text">{product.name}</p>
                      <Trash2
                        size={18}
                        color="gray"
                        className="cursor-pointer"
                        onClick={() => setDeleteModal({ show: true, product_id: product.product_id })}
                      />
                    </div>
                    <p className="cardcardamount2 text-sm font-light">
                      ₹ {(product.discountedprice * product.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600">
                      <b>Color: </b>
                      {product.color}
                    </p>
                    <p className="text-xs text-gray-600">
                      <b>Size: </b>
                      {product.size}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-[20px]">
                      <div className="cartcardheart">
                        <Heart
                          onClick={(e) => handleWishlistToggle(product.product_id, e)}
                          size={20}
                          color={wishlist[product.product_id] ? "red" : "gray"} // Change color based on wishlist status
                          fill={wishlist[product.product_id] ? "red" : "none"} // Filled heart if wishlisted
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="quantity-controls flex items-center">
                        <select
                          className="border border-black px-2 py-1 rounded-md"
                          value={product.quantity}
                          disabled={loadingStates[product.product_id]}
                          onChange={(e) =>
                            updateCartQuantity(product.product_id, product.size, parseInt(e.target.value))
                          }
                        >
                          {Array.from({ length: product.raw_tshirt.quantity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        {loadingStates[product.product_id] && <span className="text-xs text-gray-500 ml-2">Updating...</span>}
                      </div>
                      <Trash2
                        size={18}
                        color="gray"
                        className="cursor-pointer"
                        onClick={() => setDeleteModal({ show: true, product_id: product.product_id })}
                      />
                    </div>
                    <p className="cartcardamount text-sm font-light">
                      ₹ {(product.discountedprice * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="cartcheckout w-[35%] flex flex-col gap-5">
          <button className='w-full border text-md border-black flex items-center justify-center bg-black text-white py-2 gap-3'>
            <ShoppingBag /> <p>Continue Shopping</p>
          </button>
          <div className='w-full border border-gray-400 p-[20px] rounded-md flex flex-col items-center justify-start gap-5'>
            <p className='text-lg font-light mb-5'>Order Summary</p>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Offers</p>
              <p className='underline text-xs'>Apply Coupons</p>
            </div>
            <div className='w-full h-[1px] bg-gray-300' />
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Sub-Total</p>
              <p>₹ {productTotal}</p>
            </div>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Shipping</p>
              <p>₹ {shipping}</p>
            </div>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Discount</p>
              <p>- ₹ {discount}</p>
            </div>
            <div className='w-full h-[1px] bg-gray-300' />
            <div className='w-full flex justify-between items-center text-md font-bold'>
              <p>Total</p>
              <p>₹ {finalAmount}</p>
            </div>
          </div>
        </div>
      </div>
      {deleteModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Remove Item</h3>
              <X className="cursor-pointer" onClick={() => setDeleteModal({ show: false, product_id: null })} />
            </div>
            <p>Are you sure you want to remove this item from the cart?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 border rounded" onClick={() => setDeleteModal({ show: false, product_id: null })}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={deleteCartItem}>
                {loadingStates[deleteModal.product_id!] ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
