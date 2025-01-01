import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileSidebar from "./components/profile-sidebar";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="container h-full mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <ProfileSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="rounded-lg shadow-lg p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
