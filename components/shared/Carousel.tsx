// "use client"
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';

// const images = [
//   "/assets/img1.png",
//   "/assets/img2.png",
//   "/assets/img3.png"
// ];

// const Carousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto slide logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 3000); // Slide every 3 seconds

//     // Cleanup the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const goToNextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//   };

//   const goToPreviousSlide = () => {
//     setCurrentSlide(
//       (prevSlide) => (prevSlide - 1 + images.length) % images.length
//     );
//   };

//   return (
//     <div className="relative w-full max-w-full h-100">
//       {/* Carousel Image */}
//       <div className="homecarousel w-full h-[88vh] overflow-hidden">
//         <Image
//           src={images[currentSlide]}
//           alt={`Slide ${currentSlide + 1}`}
//           className="w-full h-full object-cover"
//           fill={true}
//         />
//       </div>

//       {/* Navigation buttons */}
//       <button
//         onClick={goToPreviousSlide}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
//       >
//         &#8592;
//       </button>
//       <button
//         onClick={goToNextSlide}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
//       >
//         &#8594;
//       </button>

//       {/* Indicators */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const images = ["https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743346148/IMG_2959.JPEG_ssyr2p.jpg", "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743346123/IMG_2960.JPEG_vhuybv.jpg", "https://res.cloudinary.com/dqzvpy7hf/image/upload/v1743346123/IMG_2965.JPEG_f6coum.jpg"]

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const Carousel = () => {
  const router = useRouter()
  const [[page, direction], setPage] = useState([0, 0])
  const [isHovered, setIsHovered] = useState(false)

  // Calculate current slide index
  const imageIndex = ((page % images.length) + images.length) % images.length

  // Auto slide logic
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      paginate(1)
    }, 5000) // Slide every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval)
  }, [isHovered, page])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div
      className="relative w-full max-w-full h-[88vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Image */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[imageIndex] || "/placeholder.svg"}
              alt={`Slide ${imageIndex + 1}`}
              className="object-cover"
              fill={true}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent">
              <div className="container mx-auto h-full flex flex-col justify-center px-8 md:px-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Elevate Your Style</h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    Discover our latest collection designed for comfort and confidence.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white border-2 border-white px-8 py-3 text-lg font-medium tracking-wider transition-all duration-300"
                    onClick={() => router.push('/shop')}
                  >
                    SHOP NOW
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.9 : 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl bg-black/50 p-3 rounded-full z-10"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.9 : 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl bg-black/50 p-3 rounded-full z-10"
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`cursor-pointer h-1.5 rounded-full ${imageIndex === index ? "bg-white w-8" : "bg-white/50 w-4"}`}
            onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
            whileHover={{ scale: 1.2 }}
            animate={{
              width: imageIndex === index ? 32 : 16,
              opacity: imageIndex === index ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

