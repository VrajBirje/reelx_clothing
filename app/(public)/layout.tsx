import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-white-100">
      <main className="pt-20 md:pt-24 bg-white-100">{children}</main>
    </div>
  );
};

export default DashboardLayout;
