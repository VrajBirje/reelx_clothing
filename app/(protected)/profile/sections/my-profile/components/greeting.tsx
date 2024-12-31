'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function Greeting() {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 17) return "Good Afternoon";
      return "Good Evening";
    };
    
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="mb-0 p-8 bg-white rounded-lg border border-gray-200 shadow-md">
      <h1 className="text-3xl font-semibold text-gray-900 leading-relaxed">
        {greeting}, {user?.firstName} 👋
      </h1>
      <p className="mt-2 text-base text-gray-600 leading-normal">
        Welcome back to your profile dashboard.
      </p>
    </div>
  );
}
