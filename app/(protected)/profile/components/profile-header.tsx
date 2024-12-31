"use client"
import { useState, useEffect } from 'react';
import { useClerk, useUser } from "@clerk/nextjs";

const ProfileHeader = () => {
  const [time, setTime] = useState(new Date());
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const { user } = useUser();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    if (user) {
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      });
    } else {
      const localUserData = localStorage.getItem('userData');
      if (localUserData) {
        const parsedData = JSON.parse(localUserData);
        setUserData({
          firstName: parsedData.firstName || '',
          lastName: parsedData.lastName || '',
          email: parsedData.email || ''
        });
      }
    }

    return () => clearInterval(timer);
  }, [user]);

  const getInitials = () => {
    const first = userData.firstName?.charAt(0) || '';
    const last = userData.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  return (
    <div className="flex items-center p-4 border-b">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        {user?.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-600 text-lg">{getInitials()}</span>
        )}
      </div>
      <div className="ml-4">
        <h2 className="font-medium">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-sm text-gray-500">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;