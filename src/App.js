import React from 'react';
import Form from './components/Form';
import baron from './img/baron1.jpg'


function App() {
  return (
    <div id="mainContainer">
      <p>Nadácia Good Boy</p>
      <img src={baron} alt="" id='baron' />
      <Form />
    </div>
  );
}

export default App;
