import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Reelx is committed to protecting your privacy and ensuring the security of your personal information.
          We collect customer data, including name, contact details, and purchase history, solely for order
          processing, personalized recommendations, and promotional updates. We do not share your
          information with third parties except for secure payment processing and logistics. Our website uses
          encryption and secure servers to safeguard your data. By using our website, you consent to our data
          collection and usage policies. You have the right to request data deletion or modification at any time
          by contacting our support team.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;