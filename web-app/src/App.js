import React, { useState, useEffect } from 'react';
import { getTemplate } from './services/TemplateService';
import JsonEditor from './components/JsonEditor';
import ImageColorPalette from './components/ImageColorPalette';
import RandomColorGenerator from './components/RandomColorGenerator';
import NipponColorPalette from './components/NipponColorPalette';

function App() {
  const [template, setTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setTemplate(data);
    };
    reader.readAsText(file);
  };

  const handleDataChange = (newData) => {
    setTemplate(newData);
  };

  const handlePaletteSelect = (color) => {
    setSelectedColor(color);
  };

  const handleColorGenerate = (color) => {
    setSelectedColor(color);
  };

  const handleSave = () => {
    if (template) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "template.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  return (
    <div>
      <h1>Game JSON Tools</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSave}>Save to Local</button>
      <ImageColorPalette onPaletteSelect={handlePaletteSelect} />
      <RandomColorGenerator onColorGenerate={handleColorGenerate} />
      <NipponColorPalette onPaletteSelect={handlePaletteSelect} />
      {template && <JsonEditor data={template} onDataChange={handleDataChange} selectedColor={selectedColor} />}
    </div>
  );
}

export default App;
