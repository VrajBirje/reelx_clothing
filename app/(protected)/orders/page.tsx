"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FlyingBird from '@/components/animatedLogo';

interface Product {
  name: string;
  size: string;
  color: string;
  images: string[];
  quantity: number;
  discountedprice: number;
}

interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Order {
  order_id: string;
  customer_name: string;
  products: Product[];
  address_details: OrderAddress;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { id } = JSON.parse(userData);
      fetchOrders(id);
    }
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/orders/${userId}`);
      const data = await response.json();
      if (data.success) {
        // Sort orders by created_at in descending order (most recent first)
        const sortedOrders = data.data.sort((a: Order, b: Order) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleCancelOrder = async (orderId: string) => {
    const userData = localStorage.getItem("userData");
    if (!userData) return;
    
    const { id: userId } = JSON.parse(userData);
    
    try {
      setCancelLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/orders/${orderId}/cancel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        toast.success('Order cancelled successfully');
        setShowCancelModal(false);
        // Refresh orders
        fetchOrders(userId);
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return <FlyingBird />;
  }

  if (orders.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
          <p className="text-gray-600">You haven&apos;t placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            {cancelLoading ? (
              <div className="flex justify-center">
                <FlyingBird />
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Cancel Order</h3>
                <p className="mb-6">Are you sure you want to cancel this order?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    No, Keep Order
                  </button>
                  <button
                    onClick={() => handleCancelOrder(selectedOrderId)}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={order.order_id} className="border rounded-lg p-6 relative">
            {/* Order Status Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm 
              ${order.status === 'placed' ? 'bg-green-100 text-green-800' : 
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                'bg-blue-100 text-blue-800'}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>

            {/* Order Number */}
            <div className="mb-4">
              <span className="text-sm text-gray-500">Order #{orders.length - index}</span>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={`${product.name}-${product.size}`} className="flex items-center gap-4 border-b pb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {product.size} | Color: {product.color} | Qty: {product.quantity}
                    </p>
                    <p className="text-sm font-medium">₹{product.discountedprice * product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-600">
                {order.address_details.street}<br />
                {order.address_details.city}, {order.address_details.state}<br />
                {order.address_details.zip}, {order.address_details.country}
              </p>
            </div>

            {/* Order Summary */}
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Total Amount: ₹{order.total_amount}</p>
                <p className="text-sm text-gray-600">Payment Method: {order.payment_method.toUpperCase()}</p>
              </div>
              
              {/* Cancel Button */}
              {order.status === 'placed' && (
                <button
                  onClick={() => openCancelModal(order.order_id)}
                  className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 