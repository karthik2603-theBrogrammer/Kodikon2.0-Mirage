import React from 'react';

const Loader = () => {
  return (
    <div className='spinner-box md:pr-[130px] pr-[30px]'>
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
