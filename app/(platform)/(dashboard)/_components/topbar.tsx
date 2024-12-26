"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const topbarItems = [
  {
    name: "Shop",
    href: "/shop",
    icon: MdDashboard,
  },
  {
    name: "About Us", // should be in footer of page (footer should not be fixed for ) 
    href: "/about-us",
    icon: FaTasks,
  },
  {
    name: "Cart", // should be only an icon
    href: "/cart",
    icon: FaShoppingCart,
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: FaShoppingCart,
  },
  {
    name: "Order History",
    href: "/order-history",
    icon: FaShoppingCart,
  },
];

// address would be a button besides the user profile icon
// and would be a dropdown with the user's address options and create address button 

//contact us and about us would be the same page 

export default function Topbar() {
  return (
    <div className="flex justify-start md:justify-center items-center">
      <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 ml-2 mt-4 md:mb-4">
        {topbarItems.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link
              href={href}
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
            >
              {/* <Icon className="w-5 h-5" /> */}
              <span className="font-medium">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
