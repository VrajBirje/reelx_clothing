"use client";
import { Banknote, CreditCard, Heart, ShoppingBag, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import FlyingBird from "@/components/animatedLogo";
import CheckoutModal from '@/components/CheckoutModal';

interface UserData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  id: string;
}

interface CartItem {
  cart_id: string;
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

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const [loadingStates2, setLoadingStates2] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; cart_id: string | null }>({
    show: false,
    cart_id: null,
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserData(parsedData);
      fetchCartItems(parsedData.id);
      fetchWishlist(parsedData.id);
    }
  }, []);

  useEffect(() => {
    const checkIfNewUser = async () => {
      if (userData?.id) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/orders/${userData.id}`);
          // Check for exact structure: { success: true, data: [] }
          setIsNewUser(
            response.data.success === true &&
            Array.isArray(response.data.data) &&
            response.data.data.length === 0
          );
        } catch (error) {
          console.error("Error checking order history:", error);
          setIsNewUser(false);
        }
      }
    };
    checkIfNewUser();
  }, [userData]);

  // Fetch Cart Items
  const fetchCartItems = async (userId: string) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/cart/${userId}`);
      setCartItems(data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };
  // Rest of your component code remains the same...
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

  if (loading) {
    return <FlyingBird />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600">Add some items to your cart to get started!</p>
        </div>
      </div>
    );
  }


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
  const updateCartQuantity = async (cart_id: string, product_id: number, size: string, quantity: number) => {
    if (!userData) return;

    setLoadingStates((prev) => ({ ...prev, [product_id]: true }));

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/cart/update`, {
        customer_id: userData.id,
        product_id,
        size,
        quantity,
        cart_id, // Ensure cart_id is passed correctly
      });

      if (response.data.success) {
        // Update only the specific cart item using cart_id
        setCartItems((prev) =>
          prev.map((item) =>
            item.cart_id === cart_id ? { ...item, quantity } : item
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
      setCouponCode("");
      setDiscountedAmount(0);
    }
  };

  const deleteCartItem = async () => {
    if (!userData || deleteModal.cart_id === null) return; // Use cart_id instead of product_id

    setLoadingStates2((prev) => ({ ...prev, [deleteModal.cart_id!]: true })); // Use cart_id for loading state

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/cart/remove`, {
        data: {
          cart_id: deleteModal.cart_id, // Pass cart_id instead of product_id
        },
      });

      if (response.data.success) {
        // Update the cart items state by removing the deleted item using cart_id
        setCartItems((prev) =>
          prev.filter((item) => item.cart_id !== deleteModal.cart_id)
        );
        setDeleteModal({ show: false, cart_id: null }); // Reset cart_id in the modal state
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Failed to delete item");
    } finally {
      setLoadingStates2((prev) => ({ ...prev, [deleteModal.cart_id!]: false })); // Use cart_id for loading state
      setCouponCode("");
      setDiscountedAmount(0);
    }
  };
console.log(cartItems)
  const codCharge = paymentMethod === 'cod' ? 20.0 : 0;
  const shippingCharge = 50;

  // Calculate total price
  const productTotal = cartItems.reduce((total, product) => total + product.discountedprice * product.quantity, 0);

  // Calculate final amount
  const finalAmount = productTotal + shippingCharge + codCharge - discountedAmount;

  // Update the checkout button click handler
  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
  };

  const validateCoupon = async () => {
    if (!userData?.id) return;
    setIsLoadingCoupon(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, {
        code: couponCode,
        clerk_user_id: userData.id,
        order_amount: productTotal,
        is_new_user: isNewUser
      });

      if (response.data.success) {
        setDiscountedAmount(response.data.discount);
        toast.success("Coupon applied successfully!");
        setIsCouponModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to validate coupon";
      toast.error(errorMessage);
    } finally {
      setIsLoadingCoupon(false);
    }
  };

  return (
    <div className="cart flex py-[20px] justify-center bg-white 2xl:max-w-screen-xl mx-auto w-full flex-col items-center gap-[30px]">
      <div className="carttopmobile w-full flex justify-between items-center gap-2 p-2 border-b-[1px] border-gray">
        <div className="flex flex-col w-[40%] gap-0">
          <p className="text-xs font-light">Total :</p>
          <p className="text-l font-bold">₹ {finalAmount}/-</p>
        </div>
        <button
          className="w-full text-sm font-semibold border border-black bg-black flex items-center justify-center text-white py-2 gap-3"
          onClick={handleCheckoutClick}
        >
          CHECKOUT
        </button>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="heading text-xl font-bold">My Cart</p>
        <p>{cartItems.length} items</p>
      </div>
      <div className="cartlr w-full flex justify-between items-start">
        <div className="sm:w-[60%] w-full  flex flex-col">
          <div className="cartleft products w-full border border-black">
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
                          onClick={() => setDeleteModal({ show: true, cart_id: product.cart_id })}
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
                              updateCartQuantity(product.cart_id, product.product_id, product.size, parseInt(e.target.value))
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
                        {/* <Trash2
                          size={18}
                          color="gray"
                          className="cursor-pointer"
                          onClick={() => setDeleteModal({ show: true, product_id: product.product_id })}
                        /> */}
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
          <button className='w-full border text-md border-black flex items-center justify-center bg-black text-white py-2 gap-3 mt-5' onClick={() => router.push('/shop')}>
            <ShoppingBag /> <p>Continue Shopping</p>
          </button>
        </div>
        <div className="cartcheckout w-[35%] flex flex-col gap-5">


          {/* Payment Method Selection */}
          <div className='w-full border border-gray-400 p-3 rounded-md'>
            <p className='text-sm font-light mb-2'>Payment Method</p>
            <div className='flex gap-3'>
              <div
                className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer ${paymentMethod === 'online' ? 'border-black' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('online')}
              >
                <input
                  type="radio"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                <div className="flex items-center gap-1">
                  {/* <CreditCard size={14} /> */}
                  <Image src='/assets/cashless.png' alt="card" height={34} width={34}></Image>
                  <div>
                    <p className='text-xs font-semibold'>Online Payment</p>
                    <p className='text-xs text-gray-600'>Pay securely</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input
                  type="radio"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div className="flex items-center gap-1">
                  {/* <Banknote size={14} /> */}
                  <Image src='/assets/money.png' alt="cash" height={34} width={34}></Image>
                  <div>
                    <p className='text-xs font-semibold'>Cash on Delivery</p>
                    <p className='text-xs text-gray-600'>+₹20/- charge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full border border-gray-400 p-[20px] rounded-md flex flex-col items-center justify-start gap-5'>
            <p className='text-lg font-light mb-5'>Order Summary</p>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Offers</p>
              <p
                className='underline text-xs cursor-pointer'
                onClick={() => setIsCouponModalOpen(true)}
              >
                {discountedAmount > 0 ? `Coupon Applied: ${couponCode}` : 'Apply Coupons'}
              </p>
            </div>
            {discountedAmount > 0 && (
              <div className='w-full flex justify-between items-center text-sm font-semibold text-green-600'>
                <p>Discount</p>
                <p>-₹ {discountedAmount}</p>
              </div>
            )}
            <div className='w-full h-[1px] bg-gray-300' />
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Sub-Total</p>
              <p>₹ {productTotal}</p>
            </div>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Shipping</p>
              <p>₹ {shippingCharge}</p>
            </div>
            {paymentMethod === 'cod' && (
              <div className='w-full flex justify-between items-center text-sm font-semibold'>
                <p>COD charge</p>
                <p>₹ {codCharge}</p>
              </div>
            )}
            <div className='w-full h-[1px] bg-gray-300' />
            <div className='w-full flex justify-between items-center text-md font-bold'>
              <p>Total</p>
              <p>₹ {finalAmount}</p>
            </div>
            <button
              className='w-full border text-md border-black flex items-center justify-center bg-black text-white py-2 gap-3'
              onClick={handleCheckoutClick}
            >
              <ShoppingBag /> <p>Checkout</p>
            </button>
          </div>
        </div>
      </div>
      {deleteModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Remove Item</h3>
              <X className="cursor-pointer" onClick={() => setDeleteModal({ show: false, cart_id: null })} />
            </div>
            <p>Are you sure you want to remove this item from the cart?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 border rounded" onClick={() => setDeleteModal({ show: false, cart_id: null })}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={deleteCartItem}>
                {loadingStates2[deleteModal.cart_id!] ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCouponModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Apply Coupon</h3>
              <X className="cursor-pointer" onClick={() => setIsCouponModalOpen(false)} />
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            <button
              className="w-full bg-black text-white py-2 rounded"
              onClick={validateCoupon}
              disabled={isLoadingCoupon}
            >
              {isLoadingCoupon ? "Validating..." : "Apply"}
            </button>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        paymentMethod={paymentMethod}
        amount={finalAmount}
        userId={userData?.id || ''}
        userName={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
        userPhone={userData?.phone || ''}
        subtotal={productTotal}
        discountedAmount={discountedAmount}
        shippingCharges={shippingCharge}
        codCharge={codCharge}
        couponCode={couponCode}
        userEmail={userData?.email || ''}
        phone2={userData?.phone || ''}
      />
    </div>
  );
};

export default Page;