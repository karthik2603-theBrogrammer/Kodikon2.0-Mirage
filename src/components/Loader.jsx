import React from 'react';

const Loader = () => {
  return (
    <div className='spinner-box h-[40vh] flex items-center justify-center mt-9 self-center pl-9 md:pl-[140px]'>
      <div className='configure-border-1 self-center '>
        <div className='configure-core self-center'></div>
      </div>
      <div className='configure-border-2 self-center'>
        <div className='configure-core self-center'></div>
      </div>
    </div>
  );
};

export default Loader;
