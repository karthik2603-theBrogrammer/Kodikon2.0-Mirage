import React from "react";
import { useRef, useState, useEffect } from "react";
import DOTS from "vanta/dist/vanta.dots.min.js";
import { Link } from "react-router-dom";
import { MdInventory } from "react-icons/md";
import { IoNavigateCircleSharp } from 'react-icons/io5'


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
        className="w-[100vw] h-[100vh] top-[-33px]  left-[-33px] md:left-[-124px] flex justify-center items-center flex-col relative opacity-80"
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row">
            <MdInventory size={70} color="orange" className="mb-2 mx-3" />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r to-gray-100 from-orange-400 
            mb-5 mr-3  self-center font-extrabold text-gray-900 dark:text-white text-6xl  md:text-5xl lg:text-6xl"
            >
              Mirage
            </span>
          </div>
          <h1 className="mb-4 text-3xl self-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Inventory Manager
          </h1>
        </div>
        <p className=" md:w-[700px] my-4 text-1.5xl md:text-2xl font-normal text-gray-100 dark:text-gray-200">
          In This Project In accordance with ONDC, We have developed an
          interface that includes product detection, description generator as
          well as an ERP system, that generates an automated email at realtime.
        </p>
        <div className="flex flex-col items-center justify-center">
          <Link to='/erp' className="text-white font-extralight text-2xl md:text-4xl m-4">Go To ERP</Link>
          <IoNavigateCircleSharp color="orange" size={30}/>
        </div>
      </div>
    </>
  );
};

export default Hero;
