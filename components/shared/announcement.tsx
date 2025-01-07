"use client";
import React, { useState, useEffect } from "react";

export const Announcement = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // If the scroll position is greater than 50px, hide the announcement
      if (window.scrollY > 50) {
        setShowAnnouncement(false);
      } else {
        setShowAnnouncement(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`announce w-full h-8 text-white bg-black flex items-center font-semibold justify-center text-sm transition-all duration-300 ease-in-out ${
        showAnnouncement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%]"
      }`}
    >
      <div className="announcetext">Limited Time Prices + Free Shipping | 15% OFF on 2 or more products</div>
    </div>
  );
};
