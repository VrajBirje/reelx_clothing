// app/(protected)/layout.tsx
import { auth, clerkClient } from "@clerk/nextjs";
import ProtectedLayoutClient from "./protectedLayoutClient";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await clerkClient.users.getUser(userId);
  const userData = {
    firstName: user.firstName || "", // Fallback to an empty string if null
    lastName: user.lastName || "",  // Fallback to an empty string if null
    email: user.emailAddresses[0]?.emailAddress || "",
    phone: user.phoneNumbers[0]?.phoneNumber || null,
    id: user.id,
  };

  return <ProtectedLayoutClient userData={userData}>{children}</ProtectedLayoutClient>;
}
