import React from 'react';
import { useRef, useState, useEffect } from 'react';
import DOTS from 'vanta/dist/vanta.dots.min.js';

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
      <div ref={myRef} id='typewriter' className='w-[100vw] h-[100vh] relative'>
        <div className='flex flex-col absolute top-[20px]'>
          <h1 className='text-white ml-[10px] text-[40px]'>MIRAGE</h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
