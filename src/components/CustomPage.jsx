import React, { useState, useEffect } from 'react';

const CustomPage = ({ imageDesc, description }) => {
  return (
    <div className='text-white'>
      {imageDesc}
      {description}
    </div>
  );
};

export default CustomPage;
