import React, { Fragment } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //     <>
    //     <div className='h-full'>
    //       <Navbar />
    //         <main className='pt-18 md:pt-20 2xl:max-w-screen-xl mx-auto'>
    //           <div className='layout'>
    //             {children}
    //           </div>
    //         </main>
    //     </div>
    // </>
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
