import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MyProfilePage from "./(sections)/my-profile/page";

export default function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <MyProfilePage />;
}