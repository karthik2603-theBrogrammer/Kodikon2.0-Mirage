import React, { useState, useEffect } from 'react';

const CustomPage = ({ imageDesc, productGenDesc }) => {
  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 h-[400px] text-white rounded-full mt-[60px] flex align-center justify-center flex-col'>
      <h1 className='font-normal text-[70px] md:text-[90px] relative bottom-[12px] text-gray-200 '>
        {imageDesc}
      </h1>
      <p className='font-normal text-[60%] md:text-2xl px-10 pb-10'> {productGenDesc}</p>
    </div>
  );
};

export default CustomPage;
