'use client';

import { useEffect } from 'react';

interface UserDataProviderProps {
  userData: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    id: string;
  };
}

export function UserDataProvider({ userData }: UserDataProviderProps) {
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return null;
}