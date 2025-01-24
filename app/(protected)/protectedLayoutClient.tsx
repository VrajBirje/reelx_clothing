// app/(protected)/ProtectedLayoutClient.tsx
"use client";

import { UserDataProvider } from "@/components/providers/user-data-provider";

export default function ProtectedLayoutClient({
  userData,
  children,
}: {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    id: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <UserDataProvider userData={userData} />
      <main className="protectlayout pt-24 pb-10">{children}</main>
    </div>
  );
}
