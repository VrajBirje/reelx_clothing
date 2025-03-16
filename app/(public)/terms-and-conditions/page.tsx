import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>These terms govern your use of Reelx’s website and services. By accessing our website, you agree to comply with these terms.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p>You must be at least 16 years old to purchase from our website. By placing an order, you confirm that you meet this requirement.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">3. Pricing & Payment</h2>
            <ul className="list-disc list-inside">
              <li>Prices are subject to change without prior notice.</li>
              <li>Payments must be made via our accepted payment methods, including credit/debit cards, UPI, net banking, and Cash on Delivery (COD).</li>
              <li>COD orders may incur an additional charge.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p>All designs, logos, and content on our website are the exclusive property of Reelx and may not be copied, reproduced, or distributed without permission.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">5. User Conduct</h2>
            <p>Users must not engage in fraudulent transactions, misuse of services, or violation of any applicable laws. Any breach of this clause may result in a permanent ban from our services.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">6. Order Confirmation</h2>
            <ul className="list-disc list-inside">
              <li>Once an order is placed, you will receive a confirmation email and a phone call within 12-24 hours.</li>
              <li>Please check your details carefully, as changes cannot be made once the order is processed.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">7. Product Availability</h2>
            <ul className="list-disc list-inside">
              <li>All products are subject to availability.</li>
              <li>In the case of stock unavailability, we will notify you and provide a refund or alternative option.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">8. Return Fraud Prevention</h2>
            <p>To prevent fraud, returned products must be in their original condition, unused, and with intact tags.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">9. Return & Exchange Policy Violation</h2>
            <p>If a returned or exchanged product is found to be damaged or violates Reelx Clothing’s policies, a penalty ranging from 5% to 50% of the product’s value may be imposed.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">10. Termination</h2>
            <p>We reserve the right to suspend or terminate services for policy violations. Any abusive behavior towards our staff or misuse of return policies will result in a ban from future purchases.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;