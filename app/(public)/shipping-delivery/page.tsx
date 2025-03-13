import React from 'react';

const ShippingDelivery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Shipping and Delivery Policy</h1>
        <div className="space-y-4 text-gray-700">
          <p><strong>Processing Time:</strong> Orders are processed within 2-3 business days.</p>
          <p><strong>Shipping Duration:</strong> Standard delivery takes 5-7 business days. Express delivery is available at an additional charge.</p>
          <p><strong>Cash on Delivery (COD):</strong> COD orders may incur an additional charge.</p>
          <p><strong>Delivery Areas:</strong> We currently ship across India. International shipping is under development.</p>
          <p><strong>Delays:</strong> Unforeseen circumstances like weather, strikes, or logistics issues may cause delays.</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;