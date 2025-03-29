// // "use client"
// import { Poppins } from "next/font/google";
// import Carousel from "@/components/shared/Carousel";
// import Trending from "@/components/shared/trending";
// import "./home.css"

// const images = [
//   { src: "/assets/gym.jpg", name: "GYM WEAR" },
//   { src: "/assets/plain.jpg", name: "MINIMAL DRIP" },
//   { src: "/assets/newA.jpg", name: "NEW ARRIVALS" }
// ];

// const textFont = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });
// const HomePage = () => {

//   return (
//     <div className="pt-28 md:pt-24 w-full ">
//       <Carousel />
//       <div className="flex flex-col w-full px-[30px] justify-center my-10 items-center">
//         <p className="homecategory hometop font-light text-xl">TOP CATEGORIES</p>
//         <div className="homeimg w-[100%] h-[70vh] flex itmes-center justify-center gap-[30px]">
//           {images.map((image, index) => (
//             <div key={index} className="homeimg1 relative h-full w-[25vw] p-0 flex items-center justify-center flex-col gap-5" style={{ backgroundImage: `url(${image.src})`, backgroundSize: "cover", backgroundPosition: "center", }}>
//               <p className="text-2xl text-white font-bold col-white">{image.name}</p>
//               <button className="bg-white text-gray-700 col-gray py-1 px-3 text-sm font-bold">SHOP NOW</button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Trending />
//       <Trending />

//     </div>
//   );
// };

// export default HomePage;


"use client"

import { Poppins } from "next/font/google"
import { motion } from "framer-motion"
import Carousel from "@/components/shared/Carousel"
// import Trending from "@/components/shared/trending"
import "./home.css"
import { useRouter } from "next/navigation";

const images = [
  { src: "/assets/gym.jpg", name: "GYM WEAR" },
  { src: "/assets/plain.jpg", name: "MINIMAL DRIP" },
  { src: "/assets/newA.jpg", name: "NEW ARRIVALS" },
]

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const HomePage = () => {
  const router = useRouter();

  return (
    <div className={`pt-28 md:pt-24 w-full ${textFont.className}`}>
      <Carousel />

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full px-[30px] justify-center my-16 items-center"
      >
        <div className="relative mb-10">
          <h2 className="homecategory hometop font-light text-2xl tracking-widest">TOP CATEGORIES</h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-black"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="homeimg w-[100%] h-[70vh] flex flex-col md:flex-row items-center justify-center gap-[30px]"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="homeimg1 relative h-[300px] md:h-full w-full md:w-[25vw] overflow-hidden rounded-lg shadow-md"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${image.src})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-5 p-4">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-2xl md:text-3xl text-white font-bold tracking-wider"
                >
                  {image.name}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 py-2 px-6 text-sm font-bold tracking-wider rounded-sm transition-all duration-300 hover:shadow-lg"
                  onClick={() => router.push("/shop")} // Navigate to /shop
                >
                  SHOP NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div> */}

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <Trending  />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Trending  />
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 px-[30px] bg-gray-50 mt-16 flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-light tracking-widest mb-6">JOIN OUR NEWSLETTER</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Stay updated with our latest collections, exclusive offers and style tips.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-6 py-3 font-medium tracking-wider"
          >
            SUBSCRIBE
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage

