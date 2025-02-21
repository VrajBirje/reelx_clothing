import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/Footer";
import { Announcement } from "@/components/shared/announcement";
// import { Toaster } from 'sonner';
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: [{ url: "/logo.png", href: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js"/> */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <div className="flex flex-col z-50 top-0 fixed w-full">
            <Announcement />
            <Navbar />
          </div>
          <main className="flex-1">{children}
            <Toaster position="top-center" />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
