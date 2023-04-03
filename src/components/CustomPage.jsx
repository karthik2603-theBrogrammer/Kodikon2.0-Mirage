import React, { useState, useEffect } from 'react';

const CustomPage = ({ imageDesc, description }) => {
  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 h-[200px] text-white rounded-full mt-[60px] flex align-center justify-center flex-col'>
      <h1 className='font-normal text-[50px] relative bottom-[12px] '>
        {imageDesc}
      </h1>
      <p className='font-normal text-[20px]'> {description}</p>
    </div>
  );
};

export default CustomPage;
