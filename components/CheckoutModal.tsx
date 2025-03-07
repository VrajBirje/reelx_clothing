import React, { useState, useEffect } from 'react';
import { X, MapPin, Edit2, Plus, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';
import FlyingBird from '@/components/animatedLogo';
import { useRouter } from 'next/navigation';

interface Address {
  id: string;
  address_id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: 'cod' | 'online';
  amount: number;
  userId: string;
  userName: string;
  userPhone: string;
  subtotal: number;
  discountedAmount: number;
  shippingCharges: number;
  couponCode: string;
  userEmail: string;
  phone2: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  amount,
  userId,
  userName,
  userPhone,
  subtotal,
  discountedAmount,
  shippingCharges,
  couponCode,
  userEmail,
  phone2
}) => {
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState<Address | null>(null);

  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (showEditModal && selectedAddressForEdit) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/update/${selectedAddressForEdit.address_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address_line_1: formData.address_line_1,
            address_line_2: formData.address_line_2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }),
        });
        toast.success('Address updated successfully');
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            address: {
              address_line_1: formData.address_line_1,
              address_line_2: formData.address_line_2,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode
            }
          }),
        });
        toast.success('Address added successfully');
      }
      fetchAddresses();
      setShowAddModal(false);
      setShowEditModal(false);
      setFormData({
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        pincode: ''
      });
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!name || !phone) {
        toast.error('Please fill in all fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      if (!selectedAddress) {
        setLoading(false);
        toast.error('Please select an address');
        return;
      }
      if (paymentMethod === 'online') {
        setLoading(false);
        await initiateRazorpayPayment(amount);
      } else {
        setLoading(false);
        handleSuccessfulPayment();
      }
      onClose();
    }
  };

  const handleEdit = (address: Address) => {
    setSelectedAddressForEdit(address);
    setFormData({
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
    setShowEditModal(true);
  };

  const handleSuccessfulPayment = async (paymentId?: string) => {
    try {
      // Show loading animation
      setLoading(true);
      
      const selectedAddressData = addresses.find(addr => addr.address_id === selectedAddress);
      if (!selectedAddressData) {
        throw new Error('No address selected');
      }

      const orderData = {
        user_id: userId,
        customer_name: name,
        address_details: {
          street: `${selectedAddressData.address_line_1} ${selectedAddressData.address_line_2}`,
          city: selectedAddressData.city,
          state: selectedAddressData.state,
          zip: selectedAddressData.pincode,
          country: "India"
        },
        contact_details: {
          phone: phone,
          phone2: phone2,
          email: userEmail
        },
        providedSubtotal: subtotal,
        providedTotal: amount,
        providedDiscountedAmount: discountedAmount,
        shipping_charges: shippingCharges,
        payment_method: paymentMethod,
        payment_id: paymentId || "",
        coupon_code: couponCode
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        onClose();
        // Use replace instead of push for navigation
        router.replace('/orders');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const initiateRazorpayPayment = async (finalAmount: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error('Failed to create Razorpay order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Reelx Clothing',
        description: 'Payment for your order',
        handler: async function (response: RazorpayResponse) {
          console.log('Payment successful!', response);

          const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
              address_id: selectedAddress,
              amount: finalAmount,
            }),
          });

          const verificationData = await verificationResponse.json();

          if (verificationData.status === 'success') {
            toast.success('Payment verified successfully!');
            await handleSuccessfulPayment(response.razorpay_payment_id);
          } else {
            toast.error('Payment verification failed!');
          }
        },
        prefill: {
          name: name,
          email: '', // Add email to props if needed
          contact: phone,
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Checkout</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border p-3 rounded">
              <User size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border p-3 rounded">
              <Phone size={20} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Select Delivery Address</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 text-sm text-blue-600"
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {addresses.map((address) => (
              <div
                key={address.address_id}
                className={`border p-4 rounded-lg ${
                  selectedAddress === address.address_id ? 'border-black' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === address.address_id}
                    onChange={() => setSelectedAddress(address.address_id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p>{address.address_line_1}</p>
                        <p>{address.address_line_2}</p>
                        <p>{`${address.city}, ${address.state} - ${address.pincode}`}</p>
                      </div>
                      <Edit2
                        size={16}
                        className="cursor-pointer"
                        onClick={() => handleEdit(address)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {showEditModal ? 'Edit Address' : 'Add New Address'}
                </h3>
                <X 
                  className="cursor-pointer" 
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address Line 1</label>
                  <input
                    type="text"
                    value={formData.address_line_1}
                    onChange={(e) => setFormData({...formData, address_line_1: e.target.value})}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address Line 2</label>
                  <input
                    type="text"
                    value={formData.address_line_2}
                    onChange={(e) => setFormData({...formData, address_line_2: e.target.value})}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                    disabled={loading}
                  >
                    {loading ? <FlyingBird /> : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border rounded"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="bg-black text-white px-6 py-2 rounded ml-auto"
          >
            {loading ? <FlyingBird /> : step === 1 ? 'Next' : paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;