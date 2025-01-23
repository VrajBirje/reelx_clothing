declare global {
    interface Window {
      Razorpay: any; // Use `any` or the correct type if available from the Razorpay SDK
    }
  }
  
  export {};
  