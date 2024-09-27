import { useState } from 'react';
import './App.css';

import ColorGenerator from './components/ColorGenerator';
import Preview from './components/Preview'

function App() {
  const [yourDark, setYourDark] = useState(sessionStorage.getItem("yourDark"))
  const [yourPrimary, setYourPrimary] = useState(sessionStorage.getItem("yourPrimary"))
  const [yourAccent, setYourAccent] = useState(sessionStorage.getItem("yourAccent"))
  const [yourSecondary, setYourSecondary] = useState(sessionStorage.getItem("yourSecondary"))
  const [yourLight, setYourLight] = useState(sessionStorage.getItem("yourLight"))

  const [previewColors, setPreviewColors] = useState(false)

  const togglePreviewColors = (e) => {
    setPreviewColors(!previewColors)
  }

  const defaulttheme = {
    light: "#ffffff",
    dark: "#000000",
    primary: "#a0295b"
  }

  return (
    <div>

      <h3 style={{color: previewColors ? yourPrimary : defaulttheme.primary}}>
      ColorBro
      </h3>

      <div className="mainDiv" style={{backgroundColor: previewColors ? yourLight : defaulttheme.light}}>
        <ColorGenerator
          yourDark={yourDark} setYourDark={setYourDark}
          yourPrimary={yourPrimary} setYourPrimary={setYourPrimary}
          yourAccent={yourAccent} setYourAccent={setYourAccent}
          yourSecondary={yourSecondary} setYourSecondary={setYourSecondary}
          yourLight={yourLight} setYourLight={setYourLight}
        />
        <button onClick={togglePreviewColors} style={{
          backgroundColor: previewColors ? yourDark : defaulttheme.dark,
          color: previewColors ? yourLight : defaulttheme.light
        }}>
          {previewColors ? "Make Website Use Palette Colors" : "Back To Default"}
        </button>
      </div>

    </div>
  );
}

export default App;
