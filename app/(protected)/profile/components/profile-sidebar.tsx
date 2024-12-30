"use client"
import { Button } from "@/components/ui/button";
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Clock, 
  Settings,
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "My Profile",
    icon: User,
    href: "/profile/my-profile"
  },
  {
    label: "Delivery Address",
    icon: MapPin,
    href: "/profile/addresses"
  },
  {
    label: "My Orders",
    icon: Package,
    href: "/profile/orders"
  },
  {
    label: "My Wishlist",
    icon: Heart,
    href: "/profile/wishlist"
  },
  {
    label: "Recently Viewed",
    icon: Clock,
    href: "/profile/recently-viewed"
  },
  {
    label: "Manage Account",
    icon: Settings,
    href: "#",
    isClerkAction: true
  }
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.isClerkAction) {
      openUserProfile();
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          variant={pathname === item.href ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleItemClick(item)}
          asChild={!item.isClerkAction}
        >
          {!item.isClerkAction ? (
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ) : (
            <div className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </div>
          )}
        </Button>
      ))}

      <Button
        variant="ghost"
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </Button>
    </div>
  );
}