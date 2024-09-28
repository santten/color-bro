import { useState, useEffect } from 'react';
import './App.css';

import ColorGenerator from './components/ColorGenerator';

function App() {

  const getQueryParam = (param, defaultValue) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || defaultValue;
  };

  const defaulttheme = {
    dark: "#000000",
    primary: "#a0295b",
    accent: "#232323",
    secondary: "#231456",
    light: "#ffffff",
  }


  const [yourDark, setYourDark] = useState(getQueryParam("yourDark", defaulttheme.dark))
  const [yourPrimary, setYourPrimary] = useState(getQueryParam("yourPrimary", defaulttheme.primary))
  const [yourAccent, setYourAccent] = useState(getQueryParam("yourAccent", defaulttheme.accent))
  const [yourSecondary, setYourSecondary] = useState(getQueryParam("yourSecondary", defaulttheme.secondary))
  const [yourLight, setYourLight] = useState(getQueryParam("yourLight", defaulttheme.light))

  const [previewColors, setPreviewColors] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("yourDark", yourDark);
    urlParams.set("yourPrimary", yourPrimary);
    urlParams.set("yourAccent", yourAccent);
    urlParams.set("yourSecondary", yourSecondary);
    urlParams.set("yourLight", yourLight);
    window.history.replaceState(null, null, "?" + urlParams.toString());
  }, [yourDark, yourPrimary, yourAccent, yourSecondary, yourLight]);

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', previewColors ? yourLight : defaulttheme.light);
    document.documentElement.style.setProperty('--text-color', previewColors ? yourDark : defaulttheme.dark);
    document.documentElement.style.setProperty('--primary-color', previewColors ? yourPrimary : defaulttheme.primary);
    document.documentElement.style.setProperty('--accent-color', previewColors ? yourAccent : defaulttheme.accent);
    document.documentElement.style.setProperty('--secondary-color', yourSecondary ? yourSecondary : defaulttheme.secondary);
  }, [yourDark, yourPrimary, yourAccent, yourSecondary, yourLight, previewColors]);

  const togglePreviewColors = (e) => {
    setPreviewColors(!previewColors)
  }

  useEffect(() => {
    document.body.style.backgroundColor = previewColors ? yourDark : defaulttheme.dark
  }, [yourDark]);

  return (
    <div>
      <div className="mainDiv" style={{ backgroundColor: previewColors ? yourLight : defaulttheme.light }}>
        <h3 style={{ color: previewColors ? yourPrimary : defaulttheme.primary }}>
          ColorBro
        </h3>

        <ColorGenerator
          yourDark={yourDark} setYourDark={setYourDark}
          yourPrimary={yourPrimary} setYourPrimary={setYourPrimary}
          yourAccent={yourAccent} setYourAccent={setYourAccent}
          yourSecondary={yourSecondary} setYourSecondary={setYourSecondary}
          yourLight={yourLight} setYourLight={setYourLight}
        />
        <button onClick={togglePreviewColors}>
          {previewColors ? "Use Neutral Colors in UI" : "Use Palette Colors in UI"}
        </button>
      </div>

    </div>
  );
}

export default App;
