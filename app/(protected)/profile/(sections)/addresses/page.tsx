"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import axios from 'axios';
import FlyingBird  from '@/components/animatedLogo';
import { toast } from 'react-hot-toast';

interface Address {
  address_id: string;
  user_id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  created_at: string;
  updated_at: string;
}

const AddressPage = () => {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, address_id: '' });
  const [loading, setLoading] = useState(true); // Initialize as true
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/address/user/${user?.id}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);


  const handleDelete = async (addressId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/address/delete/${addressId}`);
      setAddresses(addresses.filter(addr => addr.address_id !== addressId));
      setDeleteModal({ show: false, address_id: '' });
      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setFormData({
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
    setShowEditModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (showEditModal && selectedAddress) {
        // Update existing address
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/address/update/${selectedAddress.address_id}`, {
          address_line_1: formData.address_line_1,
          address_line_2: formData.address_line_2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        });
        toast.success('Address updated successfully');
      } else {
        // Add new address
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/add`, {
          user_id: user?.id,
          address: {
            address_line_1: formData.address_line_1,
            address_line_2: formData.address_line_2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }
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

  if (loading) {
    return <FlyingBird />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">My Addresses</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className='border text-md border-black flex items-center justify-center bg-black px-2 text-white py-2 gap-3'
        >
          <Plus size={18} /> Add Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.address_id} className="border p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="font-medium">{address.address_line_1}</p>
                <p className="text-gray-600">{address.address_line_2}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
              <div className="flex gap-3">
                <Pencil
                  size={18}
                  className="cursor-pointer"
                  onClick={() => handleEdit(address)}
                />
                <Trash2
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setDeleteModal({ show: true, address_id: address.address_id })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
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

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Address</h3>
            <p>Are you sure you want to delete this address?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setDeleteModal({ show: false, address_id: '' })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => handleDelete(deleteModal.address_id)}
                disabled={loading}
              >
                {loading ? <FlyingBird /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;