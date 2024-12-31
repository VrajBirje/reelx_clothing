"use client"
import { Poppins } from "next/font/google";
import Carousel from "@/components/shared/Carousel";
import CurvedCarousel from "@/components/shared/CurvedCarousel";
import Trending from "@/components/shared/trending";

const images = [
  { src: "/assets/gym.jpg", name:"GYM WEAR" },
  { src: "/assets/plain.jpg", name:"MINIMAL DRIP" },
  { src: "/assets/newA.jpg", name:"NEW ARRIVALS" }
];

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const HomePage = () => {

  return (
    <div className="pt-20 md:pt-24 2xl:max-w-screen-xl mx-auto w-full ">
      <Carousel />
      <div className="w-[100%] h-[70vh] flex my-20 itmes-center justify-between">
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-[25vw] p-0 flex items-center justify-center flex-col gap-5" style={{ backgroundImage: `url(${image.src})`, backgroundSize: "cover", backgroundPosition: "center", }}>
            <p className="text-2xl text-white font-bold col-white">{image.name}</p>
            <button className="bg-white text-gray-700 col-gray py-1 px-3 text-sm font-bold">SHOP NOW</button>
          </div>
        ))}
      </div>
      <CurvedCarousel/>
      <Trending/>

    </div>
  );
};

export default HomePage;


