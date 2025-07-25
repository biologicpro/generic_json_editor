import React, { useState, useEffect } from 'react';
import { getTemplate } from './services/TemplateService';
import JsonEditorV2 from './components/JsonEditorV2';
import './editor.css';
import ImageColorPalette from './components/ImageColorPalette';
import RandomColorGenerator from './components/RandomColorGenerator';
import NipponColorPalette from './components/NipponColorPalette';

function App() {
  const [template, setTemplate] = useState(null);
  useEffect(() => {
    const fetchTemplate = async () => {
      const data = await getTemplate('weirdo.json');
      setTemplate(data);
    };

    fetchTemplate();
  }, []);

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
    <div className="app-container">
      <div className="left-pane">
        <h1>Game JSON Tools</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSave}>Save to Local</button>
        {template && <JsonEditorV2 data={template} onDataChange={handleDataChange} />}
      </div>
      <div className="right-pane">
        <h2>Color Tools</h2>
        <ImageColorPalette onPaletteSelect={() => {}} />
        <RandomColorGenerator onColorGenerate={() => {}} />
        <NipponColorPalette onPaletteSelect={() => {}} />
      </div>
    </div>
  );
}

export default App;