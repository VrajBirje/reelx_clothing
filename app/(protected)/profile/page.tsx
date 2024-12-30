import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MyProfile from "./sections/my-profile/page";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <MyProfile />;
}