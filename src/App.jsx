import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import SignUpForm from './Signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <SignUpForm />
    </div>
  );
}

export default App;
