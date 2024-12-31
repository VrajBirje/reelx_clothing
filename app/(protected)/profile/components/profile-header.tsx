"use client"

import { useState, useEffect, useMemo } from 'react';
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileHeader = () => {
  const [time, setTime] = useState(new Date());
  const { user, isLoaded } = useUser();
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const userData = useMemo(() => ({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    imageUrl: user?.imageUrl || '',
  }), [user?.firstName, user?.lastName, user?.imageUrl]);

  const initials = useMemo(() => {
    const first = userData.firstName?.charAt(0) || '';
    const last = userData.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  }, [userData.firstName, userData.lastName]);

  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  }, [time]);

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
      <CardContent className="flex items-center space-x-4 p-4">
        {userData.imageUrl ? (
          <img
            src={userData.imageUrl}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            {initials}
          </div>
        )}
        
        <div className="flex flex-col">
          <h2 className="font-medium">
            {userData.firstName || userData.lastName ? 
              `${userData.firstName} ${userData.lastName}`.trim() : 
              'Guest User'}
          </h2>
          <time className="text-sm text-muted-foreground">
            {formattedTime}
          </time>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;