import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import EnterDetails from './components/EnterDetails';
function App() {
  return (
    <div className='App'>
      <Hero />
      {/* //add props to this component */}
      <EnterDetails />
    </div>
  );
}

export default App;
