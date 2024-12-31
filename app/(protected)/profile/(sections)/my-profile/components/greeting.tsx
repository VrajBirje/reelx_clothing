'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function Greeting() {
  const { user, isLoaded } = useUser();
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

  if (!isLoaded) {
    return (
      <div className="mb-0 pb-8 bg-white rounded-lg">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-48" />
      </div>
    );
  }

  return (
    <div className="mb-0 pb-8 bg-white rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-900 leading-relaxed">
        {greeting}, {user?.firstName || 'Guest'} 👋
      </h1>
      <p className="mt-2 text-base text-gray-600 leading-normal">
        Welcome back to your profile dashboard.
      </p>
    </div>
  );
}