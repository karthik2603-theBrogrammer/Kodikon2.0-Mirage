import React from "react";
import { useRef, useState, useEffect } from "react";
import DOTS from "vanta/dist/vanta.dots.min.js";
import { Link } from "react-router-dom";

const Hero = () => {
  const myRef = useRef();
  const [vantaEffect, setVantaEffect] = useState(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        DOTS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 100.0,
          minWidth: 200.0,
          scale: 1,
          scaleMobile: 0.5,
          color: 0xffd700,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <div
        ref={myRef}
        className="w-[100vw] h-[100vh] top-[-33px] md:left-[-125px]  flex justify-center items-center relative opacity-80"
      >
        <div className="p-[40px] flex flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl self-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-600 from-orange-400">
              Mirage
            </span>{" "}
            Scalable AI.
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-100 md:w-[60%] p-[40px]">
            In This Project In accordance with ONDC, We have developed an interface that includes product detection, description generator as well as an ERP system, that generates an automated email at realtime.
          </p>
          <p className="text-7xl font-sans text-gray-500  dark:text-gray-100 md:w-[60%] p-[40px]">
            ERP System
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
