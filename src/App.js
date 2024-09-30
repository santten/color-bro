import { useState, useEffect, useMemo } from 'react';
import './App.css';

import ColorGenerator from './components/ColorGenerator';

function App() {

  const getQueryParam = (param, defaultValue) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || defaultValue;
  };

  const defaulttheme = useMemo(() => ({
    dark: "#3a1329",
    primary: "#752e67",
    accent: "#b8c192",
    secondary: "#6a9072",
    light: "#fdefce",
  }), []);

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
    document.documentElement.style.setProperty('--dark-color', previewColors ? yourDark : defaulttheme.dark);
    document.documentElement.style.setProperty('--primary-color', previewColors ? yourPrimary : defaulttheme.primary);
    document.documentElement.style.setProperty('--accent-color', previewColors ? yourAccent : defaulttheme.accent);
    document.documentElement.style.setProperty('--secondary-color', previewColors ? yourSecondary : defaulttheme.secondary);
    document.documentElement.style.setProperty('--light-color', previewColors ? yourLight : defaulttheme.light);
  }, [yourDark, yourPrimary, yourAccent, yourSecondary, yourLight, previewColors, defaulttheme]);

  const togglePreviewColors = (e) => {
    setPreviewColors(!previewColors)
  }

  return (
    <div>
      <div className="mainDiv">
        <header>
          <h2>
            #ColorBro
          </h2>
          <div className="buttonHolder">
          <button onClick={togglePreviewColors}>
            {previewColors ? "Use Default Colors in UI" : "Use Palette Colors in UI"}
          </button>
          {/* new buttons here?  */}
          </div>
        </header>

        <ColorGenerator
          yourDark={yourDark} setYourDark={setYourDark}
          yourPrimary={yourPrimary} setYourPrimary={setYourPrimary}
          yourAccent={yourAccent} setYourAccent={setYourAccent}
          yourSecondary={yourSecondary} setYourSecondary={setYourSecondary}
          yourLight={yourLight} setYourLight={setYourLight}
        />
      </div>

    </div>
  );
}

export default App;
