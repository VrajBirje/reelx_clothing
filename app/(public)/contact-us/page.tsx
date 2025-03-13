import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="space-y-4 text-gray-700">
          <p><strong>Email:</strong> reelx.clothing28@gmail.com</p>
          <p><strong>Phone:</strong> +91 85911 69299</p>
          <p><strong>Address:</strong> Reelx Clothing, Dadar, Mumbai, Maharashtra - 400028</p>
          <p><strong>Social Media:</strong> Instagram, Threads, Facebook, X - @reelx_clothing</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;