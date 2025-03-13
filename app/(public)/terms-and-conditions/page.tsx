import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <div className="space-y-4 text-gray-700">
          <p><strong>1. Introduction:</strong> These terms govern your use of Reelx’s website and services. By accessing our website, you agree to comply with these terms.</p>
          <p><strong>2. Eligibility:</strong> You must be at least 16 years old to purchase from our website. By placing an order, you confirm that you meet this requirement.</p>
          <p><strong>3. Pricing & Payment:</strong> Prices are subject to change without prior notice. Payments must be made via our accepted payment methods, including credit/debit cards, UPI, and net banking.</p>
          <p><strong>4. Intellectual Property:</strong> All designs, logos, and content on our website are the exclusive property of Reelx and may not be copied, reproduced, or distributed without permission.</p>
          <p><strong>5. User Conduct:</strong> Users must not engage in fraudulent transactions, misuse of services, or violation of any applicable laws. Any breach of this clause may result in a permanent ban from our services.</p>
          <p><strong>6. Order Confirmation:</strong> Once an order is placed, you will receive a confirmation email. Please check your details carefully, as changes cannot be made once the order is processed.</p>
          <p><strong>7. Product Availability:</strong> All products are subject to availability. In the case of stock unavailability, we will notify you and provide a refund or alternative option.</p>
          <p><strong>8. Return Fraud Prevention:</strong> To prevent fraud, returned products must be in their original condition, unused, and with intact tags.</p>
          <p><strong>9. Return & Exchange Policy Violation:</strong> If a returned or exchanged product is found to be damaged or violates Reelx Clothing’s policies, a penalty ranging from 5% to 25% of the product’s value may be imposed.</p>
          <p><strong>10. Termination:</strong> We reserve the right to suspend or terminate services for policy violations. Any abusive behaviour towards our staff or misuse of return policies will result in a ban from future purchases.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;