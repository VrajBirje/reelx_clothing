import { ReactNode } from "react";
import ProfileSidebar from "./components/profile-sidebar";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <ProfileSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}