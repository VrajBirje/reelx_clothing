"use client"
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import "./cart.css"

const Page = () => {
  // Define an array of products
  const shipping = 99.00;
  const discount = 199.00;
  const products = [
    {
      id: 1,
      name: 'Relax-Fit Gym Oversized T-Shirt',
      color: 'Black',
      size: 'L',
      price: 799.00,
      img: '/assets/img6.png'
    },
    {
      id: 2,
      name: 'Relax-Fit Gym Oversized T-Shirt',
      color: 'Black',
      size: 'L',
      price: 799,
      img: '/assets/img6.png'
    },
    // Add more products as needed
  ];

  // State to manage the quantities of each product
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1 // Initial quantity for product with id 2
  });

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[id] || 1) + change;
      return {
        ...prevQuantities,
        [id]: newQuantity < 1 ? 1 : newQuantity, // Ensure quantity doesn't go below 1
      };
    });
  };

  // Calculate total product price
  const productTotal = products.reduce(
    (total, product) => total + product.price * (quantities[product.id] || 1),
    0
  );

  // Calculate final amount
  const finalAmount = productTotal + shipping - discount;

  return (
    <div className='cart flex py-[20px] justify-center bg-white 2xl:max-w-screen-xl mx-auto w-full flex-col items-center gap-[30px] '>
      <div className='w-full flex justify-between items-start items-center gap-2 p-2 border-b-[1px] border-gray'>
        <div className='flex flex-col w-[40%] gap-0'>
          <p className='text-xs font-light'>Total :</p>
          <p className='text-l font-bold'>
            ₹ {finalAmount}/-
          </p>
        </div>
        <button className='w-full text-sm font-semibold border border-black bg-black flex items-center justify-center text-white py-2 gap-3'>CHECKOUT</button>
      </div>
      <div className='w-full flex justify-between items-center'>
        <p className="heading text-xl font-bold">My Cart</p>
        <p>2 items</p>
      </div>
      <div className='cartlr w-full flex justify-between items-start'>
        <div className='cartleft products w-[60%] border border-black'>
          {products.map(product => (
            <div className='w-full relative'>
              <div key={product.id} className="product flex items-center p-[16px] gap-[20px]">
                <img src={product.img} className='h-[150px] w-[100px]' alt={product.name} />
                <div className='flex h-[150px] flex-col justify-between gap-2 w-full'>
                  <div className='w-full flex flex-col gap-2 justify-start'>
                    <div className='w-full flex items-center justify-between '>
                      <p className='cartcardname text-sm font-bold truncate-text'>{product.name}</p>
                      <Trash2 size={18} color='gray' className='carttrash' />
                    </div>
                    <p className='cardcardamount2 text-sm font-light'>₹ {(product.price * (quantities[product.id] || 1)).toFixed(2)}</p>
                    <p className='text-xs text-gray-600'><b>Color: </b>{product.color}</p>
                    <p className='text-xs text-gray-600'><b>Size: </b>{product.size}</p>
                    {/* <p className='text-xs text-gray-600'><b>Product Price: </b>{product.price}</p> */}
                  </div>
                  <div className='w-full flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[20px]'>
                      <button className='cartcardheart'>
                        <Heart />
                      </button>

                      {/* Increment/Decrement buttons for each product */}
                      <div className="quantity-controls flex items-center">
                        <button
                          className='py-1 px-3 border border-black rounded-l-xl bg-black text-white'
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantities[product.id] || 1}
                          readOnly
                          className="w-[40px] text-center border-t border-b py-1 text-center border-black"
                        />
                        <button
                          className='py-1 px-3 border border-black rounded-r-xl bg-black text-white'
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <Trash2 size={18} color='gray' className='carttrash2' />
                    </div>
                    <p className='cartcardamount text-sm font-light'>₹ {(product.price * (quantities[product.id] || 1)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="cartcheckout w-[35%] flex flex-col gap-5">
          <button className='w-full border text-md border-black flex items-center justify-center bg-black text-white py-2 gap-3'><ShoppingBag /> <p>Continue Shopping</p> </button>
          <div className='w-full border border-gray-400 p-[20px] rounded-md flex flex-col items-center justify-start gap-5'>
            <p className='text-lg font-light mb-5'>Order Summary</p>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Offers</p>
              <p className='underline text-xs'>
                Apply Coupons
              </p>
            </div>
            <div className='w-full h-[1px] bg-gray-300' />
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Sub-Total</p>
              <p>
                ₹ {productTotal}
              </p>
            </div>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Shipping</p>
              <p>
                ₹ {shipping}
              </p>
            </div>
            <div className='w-full flex justify-between items-center text-sm font-semibold'>
              <p>Discounts</p>
              <p>
                ₹ {discount}
              </p>
            </div>
            <div className='w-full h-[1px] bg-gray-400' />
            <div className='w-full flex justify-between items-center text-md font-bold'>
              <p>Total</p>
              <p>
                ₹ {finalAmount}
              </p>
            </div>
            <button className='w-full text-sm font-semibold border border-black bg-black flex items-center justify-center text-white py-2 gap-3'>CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
