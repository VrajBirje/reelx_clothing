import { UserProfile, auth } from "@clerk/nextjs";
import { ProfileForm } from "./components/profile-form";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}