"use client"
import { Poppins } from "next/font/google";
import Carousel from "@/components/shared/Carousel";
import CurvedCarousel from "@/components/shared/CurvedCarousel";
import Trending from "@/components/shared/trending";
import "./home.css"

const images = [
  { src: "/assets/gym.jpg", name: "GYM WEAR" },
  { src: "/assets/plain.jpg", name: "MINIMAL DRIP" },
  { src: "/assets/newA.jpg", name: "NEW ARRIVALS" }
];

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const HomePage = () => {

  return (
    <div className="pt-28 md:pt-24 w-full ">
      <Carousel />
      <div className="flex flex-col w-full px-[30px] justify-center my-10 items-center">
        <p className="homecategory hometop font-light text-xl">TOP CATEGORIES</p>
        <div className="homeimg w-[100%] h-[70vh] flex itmes-center justify-center gap-[30px]">
          {images.map((image, index) => (
            <div key={index} className="homeimg1 relative h-full w-[25vw] p-0 flex items-center justify-center flex-col gap-5" style={{ backgroundImage: `url(${image.src})`, backgroundSize: "cover", backgroundPosition: "center", }}>
              <p className="text-2xl text-white font-bold col-white">{image.name}</p>
              <button className="bg-white text-gray-700 col-gray py-1 px-3 text-sm font-bold">SHOP NOW</button>
            </div>
          ))}
        </div>
      </div>
      <CurvedCarousel/>
      <Trending />
      <Trending />

    </div>
  );
};

export default HomePage;


