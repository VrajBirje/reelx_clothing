// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import CardBox from "@/components/shared/card";
// import './page.css'

// const category = ["Gym", "Minimal", "Plain", "Football"];
// const size = ["S", "M", "L", "XL"];
// const color = ["Black", "Grey", "Biege", "White"];
// const productList = [
//   {
//     id: 1,
//     name: "Gym T-Shirt",
//     price: 2099,
//     discountedPrice: 2599,
//     category: "Gym",
//     color: "Black",
//     size: "M",
//     tag: "Hot Deal",
//     image: "/images/gym-shirt.jpg",
//   },
//   {
//     id: 2,
//     name: "Minimal Hoodie",
//     price: 4990,
//     discountedPrice: 2599,
//     category: "Minimal",
//     color: "Grey",
//     size: "L",
//     tag: "Hot Deal",
//     image: "/images/minimal-hoodie.jpg",
//   },
//   {
//     id: 3,
//     name: "Plain White Tee",
//     price: 1599,
//     discountedPrice: 2599,
//     category: "Plain",
//     color: "White",
//     size: "S",
//     tag: "Hot Deal",
//     image: "/images/plain-tee.jpg",
//   },
//   {
//     id: 4,
//     name: "Football Jersey",
//     price: 2599,
//     discountedPrice: 2599,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 5,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 6,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 7,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 8,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 9,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 10,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 11,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   {
//     id: 12,
//     name: "Football Jersey",
//     price: 3999,
//     category: "Football",
//     color: "Beige",
//     size: "XL",
//     tag: "Hot Deal",
//     image: "/images/football-jersey.jpg",
//   },
//   // Add more products as needed
// ];

// const Page = () => {
//   const [isScrollable, setIsScrollable] = useState(true);

//   const announcementRef = useRef<HTMLDivElement>(null);
//   const footerRef = useRef<HTMLDivElement>(null);
//   const rightSectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observerCallback = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry) => {
//         if (
//           entry.target === announcementRef.current ||
//           entry.target === footerRef.current
//         ) {
//           setIsScrollable(!entry.isIntersecting);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, {
//       threshold: 0.1,
//     });

//     if (announcementRef.current) observer.observe(announcementRef.current);
//     if (footerRef.current) observer.observe(footerRef.current);

//     return () => {
//       if (announcementRef.current) observer.unobserve(announcementRef.current);
//       if (footerRef.current) observer.unobserve(footerRef.current);
//     };
//   }, []);

//   return (
//     <div className="shop flex flex-col bg-white px-[4%] w-full">
//       <div ref={announcementRef} className="z-50">
//         <div
//           className="h-[1px] w-full"
//         >
//         </div>
//       </div>

//       <div className="flex flex-1">

//         <div className="shopleft w-[15%] flex flex-col gap-[20px] p-4 sticky top-0">

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


//         <div
//           ref={rightSectionRef}
//           className={`shopright w-[85%] flex flex-col justify-start ${isScrollable ? "overflow-y-auto" : "overflow-hidden"
//             } no-scrollbar`}
//         >
//           <div className="w-full flex justify-between my-4">
//             <p className="text-xl "></p>
//             <select className="text-sm border border-black py-1 flex items-center justify-center gap-2 px-4">
//               <option value="Best">Best for You</option>
//               <option value="Best">Best Selling</option>
//               <option value="pricel">Price (low to high)</option>
//               <option value="priceh">Price (high to low)</option>
//             </select>
//           </div>
//           <div className="w-full flex flex-wrap justify-between gap-4">
//             {productList.map((product) => (
//               <div key={product.id} className="shopcardbox">
//                 <CardBox
//                   name={product.name}
//                   price={product.price}
//                   discountedPrice={product.discountedPrice}
//                   image="/assets/img4.png"
//                   tag={product.tag}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <footer
//         ref={footerRef}
//         className="w-full h-[1px] bg-gray-200 flex items-center justify-center"
//       >
//       </footer>
//     </div>
//   );
// };

// export default Page;