import { auth,clerkClient } from "@clerk/nextjs";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { UserDataProvider } from "@/components/providers/user-data-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let userData = null;

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      phone: user.phoneNumbers[0]?.phoneNumber,
      id: user.id
    };
  }

  return (
    <div className="min-h-screen">
      {userData && <UserDataProvider userData={userData} />}
      <main className="pt-24 pb-10">{children}</main>
    </div>
  );
}
