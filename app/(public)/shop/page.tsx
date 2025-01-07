"use client";
import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CardBox from "@/components/shared/card";
import './page.css'

const category = ["Gym", "Minimal", "Plain", "Football"];
const size = ["S", "M", "L", "XL"];
const color = ["Black", "Grey", "Biege", "White"];
const prod = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Page = () => {
  const [isScrollable, setIsScrollable] = useState(true);

  const announcementRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.target === announcementRef.current ||
          entry.target === footerRef.current
        ) {
          setIsScrollable(!entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (announcementRef.current) observer.observe(announcementRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (announcementRef.current) observer.unobserve(announcementRef.current);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <div className="shop flex flex-col bg-white px-[4%] w-full">
      <div ref={announcementRef} className="z-50">
        <div
          className="h-[1px] w-full"
        >
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Section */}
        <div className="shopleft w-[15%] flex flex-col gap-[20px] p-4 sticky top-0">
          
          <div className="flex flex-col">
            <p className="text-xs font-bold mb-2">Category</p>
            {category.map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
              >
                <Checkbox style={{ height: "15px", width: "15px" }} id={cat} />
                <label htmlFor={cat}>{cat}</label>
              </div>
            ))}
          </div>
          <div className="h-[1px] w-full bg-gray-400"></div>


          <div className="flex flex-col">
            <p className="text-xs font-semibold mb-2">Size</p>
            {size.map((s) => (
              <div
                key={s}
                className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
              >
                <Checkbox style={{ height: "15px", width: "15px" }} id={s} />
                <label htmlFor={s}>{s}</label>
              </div>
            ))}
          </div>
          <div className="h-[0.5px] w-full bg-gray-400"></div>

        
          <div className="flex flex-col">
            <p className="text-xs font-bold mb-2">Color</p>
            {color.map((col) => (
              <div
                key={col}
                className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
              >
                <Checkbox style={{ height: "15px", width: "15px" }} id={col} />
                <label htmlFor={col}>{col}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          ref={rightSectionRef}
          className={`shopright w-[85%] flex flex-col justify-start ${isScrollable ? "overflow-y-auto" : "overflow-hidden"
            } no-scrollbar`}
        >
          <div className="w-full flex justify-between my-4">
            <p className="text-xl "></p>
            <select className="text-sm border border-black py-1 flex items-center justify-center gap-2 px-4">
              <option value="Best">Best for You</option>
              <option value="Best">Best Selling</option>
              <option value="pricel">Price (low to high)</option>
              <option value="priceh">Price (high to low)</option>
            </select>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-4">
            {prod.map((item) => (
              <div key={item} className="shopcardbox">
                <CardBox />
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer
        ref={footerRef}
        className="w-full h-[1px] bg-gray-200 flex items-center justify-center"
      >
      </footer>
    </div>
  );
};

export default Page;
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import CardBox from "@/components/shared/card";

// const category = ["Gym", "Minimal", "Plain", "Football"];
// const size = ["S", "M", "L", "XL"];
// const color = ["Black", "Grey", "Biege", "White"];
// const prod = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const Page = () => {
//   const [isLeftScrollable, setIsLeftScrollable] = useState(false);

//   const announcementRef = useRef<HTMLDivElement>(null);
//   const footerRef = useRef<HTMLDivElement>(null);
//   const rightSectionRef = useRef<HTMLDivElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observerCallback = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry) => {
//         if (entry.target === bottomRef.current) {
//           setIsLeftScrollable(entry.isIntersecting);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, {
//       threshold: 0.1,
//     });

//     if (bottomRef.current) observer.observe(bottomRef.current);

//     return () => {
//       if (bottomRef.current) observer.unobserve(bottomRef.current);
//     };
//   }, []);

//   const handleLeftSectionScroll = (event: React.WheelEvent<HTMLDivElement>) => {
//     if (!isLeftScrollable && rightSectionRef.current) {
//       // Prevent scrolling on left section and forward it to the right section
//       event.preventDefault();
//       rightSectionRef.current.scrollTop += event.deltaY;
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-white 2xl:max-w-screen-xl mx-auto w-full">
//       {/* Announcement */}
//       <div ref={announcementRef} className="z-50">
//         <div className="h-[1px] w-full"></div>
//       </div>

//       <div className="flex flex-1">
//         {/* Left Section */}
//         <div
//           className={`w-[15%] border border-black flex flex-col gap-[20px] p-4 h-[screen] sticky top-0 ${
//             isLeftScrollable ? "overflow-y-auto" : "overflow-hidden"
//           }`}
//           onWheel={handleLeftSectionScroll}
//         >
//           {/* Categories */}
//           <div className="flex flex-col">
//             <p className="text-xs font-bold mb-2">Category</p>
//             {category.map((cat) => (
//               <div
//                 key={cat}
//                 className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
//               >
//                 <Checkbox style={{ height: "15px", width: "15px" }} id={cat} />
//                 <label htmlFor={cat}>{cat}</label>
//               </div>
//             ))}
//           </div>
//           <div className="h-[1px] w-full bg-gray-400"></div>

//           {/* Sizes */}
//           <div className="flex flex-col">
//             <p className="text-xs font-semibold mb-2">Size</p>
//             {size.map((s) => (
//               <div
//                 key={s}
//                 className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
//               >
//                 <Checkbox style={{ height: "15px", width: "15px" }} id={s} />
//                 <label htmlFor={s}>{s}</label>
//               </div>
//             ))}
//           </div>
//           <div className="h-[0.5px] w-full bg-gray-400"></div>

//           {/* Colors */}
//           <div className="flex flex-col">
//             <p className="text-xs font-bold mb-2">Color</p>
//             {color.map((col) => (
//               <div
//                 key={col}
//                 className="flex items-center justify-start gap-2 text-sm font-regular text-gray-600"
//               >
//                 <Checkbox style={{ height: "15px", width: "15px" }} id={col} />
//                 <label htmlFor={col}>{col}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Section */}
//         <div
//           ref={rightSectionRef}
//           className="w-[85%] pl-10 flex flex-col justify-start overflow-y-auto no-scrollbar h-screen"
//         >
//           <div className="w-full flex justify-between mb-4">
//             <p>Shop</p>
//             <select className="text-sm border border-black py-1 flex items-center justify-center gap-2 px-4">
//               <option value="Best">Best for You</option>
//               <option value="Best">Best Selling</option>
//               <option value="pricel">Price (low to high)</option>
//               <option value="priceh">Price (high to low)</option>
//             </select>
//           </div>
//           <div className="w-full flex flex-wrap justify-start gap-4">
//             {prod.map((item) => (
//               <div key={item} className="p-3">
//                 <CardBox />
//               </div>
//             ))}
//           </div>
//           <div ref={bottomRef} className="bottom h-[10px] bg-transparent"></div>
//         </div>
//       </div>

//       <footer
//         ref={footerRef}
//         className="w-full h-[1px] bg-gray-200 flex items-center justify-center"
//       ></footer>
//     </div>
//   );
// };

// export default Page;
