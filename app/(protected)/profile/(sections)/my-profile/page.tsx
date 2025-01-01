import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Greeting } from "./components/greeting";
import { ProfileForm } from "./components/profile-form";

export default function MyProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4 p-6">
        <Greeting />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <ProfileForm />
      </div>
    </div>
  );
}