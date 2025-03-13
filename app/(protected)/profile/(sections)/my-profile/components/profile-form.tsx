"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, X } from "lucide-react";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  id: string;
}

export function ProfileForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const form = useForm<ProfileFormValues>();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      setUserData(parsedData);

      form.reset({
        firstName: parsedData.firstName || "",
        lastName: parsedData.lastName || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
      });
    }
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!isEditing || !userData || !user) return;

    setIsLoading(true);

    try {
      const updatedUser = await user.update({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      console.log("User updated successfully:", updatedUser);

      const updatedData: UserData = {
        ...userData,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      localStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);

      const errorMessage =
        error.errors?.[0]?.long_message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleEdit = () => {
    if (isEditing && userData) {
      form.reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
    setIsEditing(!isEditing);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="space-y-6 rounded-lg ">
        <div className="flex sm:flex-row flex-col   justify-between">
          <div className="space-y-2 ">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500">
              Manage your personal information and preferences
            </p>
          </div>
          <Button
            type="button"
            variant={isEditing ? "ghost" : "outline"}
            size="sm"
            onClick={toggleEdit}
            className={`flex items-center gap-2 ${
              isEditing ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""
            }`}
          >
            {isEditing ? (
              <>
                <X size={16} /> Cancel
              </>
            ) : (
              <>
                <Pencil size={16} /> Edit Profile
              </>
            )}
          </Button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...form.register("firstName")}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 border-gray-200" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...form.register("lastName")}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 border-gray-200" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userData?.email || ""}
                disabled
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={userData?.phone || ""}
                disabled
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex sm:justify-end justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
