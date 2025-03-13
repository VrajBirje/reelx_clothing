import React from 'react';

const CancellationRefund: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Cancellation and Refund Policy</h1>
        <div className="space-y-4 text-gray-700">
          <p><strong>Order Cancellations:</strong> Orders can be cancelled within 12 hours of placement. Once shipped, cancellations are not permitted.</p>
          <p><strong>Returns & Refunds:</strong> Products can only be returned on the same day of delivery after approval. The product must be unused, unwashed, and with original tags. Refunds are processed within 5-7 business days after approval. If the returned product is found to be damaged or violates Reelx policies, a penalty charge of 5% to 25% may apply.</p>
          <p><strong>Exchange:</strong> Exchanges are allowed only on the same day of delivery after approval and only if the size is not proper, subject to stock availability. If the exchanged product is found to be damaged or violates Reelx policies, a penalty charge of 5% to 25% may apply.</p>
          <p><strong>Return & Exchange Process:</strong> Returns and exchanges will be handled directly through email, phone calls, or our official social media platforms, including Instagram, Threads, Facebook, and X. All accounts have the same username: @reelx_clothing.</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;