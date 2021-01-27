import React from 'react';
import Form from './components/Form';
import { useSelector } from 'react-redux';


function App() {
  const dog = useSelector(state => state.dogReducer)
  return (    
    <div id="mainContainer">
      <p>Nadácia Good Boy</p>
      <img src={dog} alt="" id='baron' />
      <Form />
    </div>
  );
}

export default App;
