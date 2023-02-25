import React, { useState, useEffect } from 'react';

const CustomPage = ({ imageDesc, description }) => {
  return (
    <div className='text-white from-slate-400	'>
      <h1 className='font-normal text-[20px]'>{imageDesc}</h1>
      <h1 className='font-normal text-[20px]'> {description}</h1>
    </div>
  );
};

export default CustomPage;
