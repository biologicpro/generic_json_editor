import React, { useState, useEffect } from 'react';
import { getTemplate } from './services/TemplateService';
import JsonEditorV2 from './components/JsonEditorV2';
import './editor.css';
import ImageColorPalette from './components/ImageColorPalette';
import ColorTools from './components/ColorTools';
import NipponColorPalette from './components/NipponColorPalette';

function App() {
  const [template, setTemplate] = useState(null);
  const [currentFilename, setCurrentFilename] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const data = await getTemplate('weirdo.json');
      setTemplate(data);
      setCurrentFilename('weirdo.json');
    };

    fetchTemplate();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setTemplate(data);
      setCurrentFilename(file.name);
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

  const handleSaveBack = () => {
    if (template && currentFilename) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", currentFilename);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  const findColorPaths = (obj, currentPath = [], colorPaths = []) => {
    for (const key in obj) {
      const newPath = [...currentPath, key];
      if (typeof obj[key] === 'string' && /^#([0-9A-Fa-f]{3}){1,2}$/.test(obj[key])) {
        colorPaths.push(newPath);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        findColorPaths(obj[key], newPath, colorPaths);
      }
    }
    return colorPaths;
  };

  const handleRandomlyAssignNipponColors = async () => {
    const response = await fetch('/nippon-colors.json');
    const nipponColors = await response.json();
    const colorHexes = nipponColors.map(color => `#${color.color}`);

    const newTemplate = JSON.parse(JSON.stringify(template)); // Deep copy
    const colorPaths = findColorPaths(newTemplate);

    colorPaths.forEach(path => {
      let current = newTemplate;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      const randomColor = colorHexes[Math.floor(Math.random() * colorHexes.length)];
      current[path[path.length - 1]] = randomColor;
    });

    setTemplate(newTemplate);
  };

  return (
    <div className="app-container">
      <div className="left-pane">
        <h1>Game JSON Tools</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSave}>Save to Local</button>
        {currentFilename && (
          <button onClick={handleSaveBack}>Save Back to {currentFilename}</button>
        )}
        {template && <JsonEditorV2 data={template} onDataChange={handleDataChange} />}
      </div>
      <div className="right-pane">
        <h2>Color Tools</h2>
        <ImageColorPalette onPaletteSelect={() => {}} />
        <ColorTools onColorGenerate={() => {}} onRandomlyAssignNipponColors={handleRandomlyAssignNipponColors} />
        <NipponColorPalette onPaletteSelect={() => {}} />
      </div>
    </div>
  );
}

export default App;
