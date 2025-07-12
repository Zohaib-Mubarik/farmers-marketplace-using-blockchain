import React, { useEffect, useState } from "react";
import Search from "./Search";

const Hero = () => {
  const images = [
    "/BG1.jpg",
    "/BG2.jpg",
    "/BG3.jpg",
  ]; // Make sure these images are in your public/ folder

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 h-[650px] w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-black ">
        <h2 className="text-lg text-white">Buy Fresh Crops, Sell with Ease Near You</h2>
        <h2 className="text-[40px] md:text-[60px] font-bold text-white">
          Grow Smarter with Farmex
        </h2>
        <Search />
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-4 flex gap-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-12 rounded bg-white transition-all duration-300 ${
              currentIndex === index ? "opacity-100" : "opacity-30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
