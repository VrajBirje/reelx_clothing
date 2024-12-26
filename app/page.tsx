import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({ src: "../public/fonts/font.woff2" });
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const HomePage = () => {
  return (
    <div className="pt-20 md:pt-24 2xl:max-w-screen-xl mx-auto">
      <div className="flex items-center justify-center flex-col">
        {/* MarketingPage */}
        <div
          className={cn(
            "flex items-center justify-center flex-col",
            headingFont.className
          )}
        >
          <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
            <Medal className="h-6 w-6 mr-2" />
            Clothing Brand
          </div>
          <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 mt-4">
            ReelXClothing
          </h1>
          {/* <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit' ></div> */}
        </div>
        <div
          className={cn(
            "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto ",
            textFont.className
          )}
        >
          At ReelXClothing, we redefine fashion with oversized t-shirts that
          blend unmatched comfort with effortless style. Designed for those who
          dare to be bold and authentic, our clothing celebrates individuality,
          freedom, and the art of standing out while feeling right at home.
          Whether you’re lounging, layering, or living life your way, we’ve got
          you covered – literally.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
