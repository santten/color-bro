import { useEffect, useState } from 'react';
import './App.css';

import ColorGenerator from './components/ColorGenerator';

function App() {
  const apiUrl = "https://www.thecolorapi.com"

  useEffect(() => {
    fetch(`${apiUrl}/id?hex=232323&format=json`)
      .then(response => response.json())
      .then(data => console.log(data.hex.value));
  }, []);

  return (
    <div>
      <ColorGenerator />
    </div>
  );
}

export default App;
