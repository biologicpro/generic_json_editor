import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const JsonEditor = ({ data, onDataChange }) => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#fff');
  const [currentKey, setCurrentKey] = useState(null);

  const handleColorClick = (color, key) => {
    setCurrentColor(color);
    setCurrentKey(key);
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorChange = (color) => {
    const newData = { ...data };
    const keys = currentKey.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = color.hex;
    onDataChange(newData);
  };

  const renderJson = (jsonData, parentKey = '') => {
    return Object.entries(jsonData).map(([key, value]) => {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={currentPath} style={{ marginLeft: '20px' }}>
            <strong>{key}:</strong>
            {renderJson(value, currentPath)}
          </div>
        );
      }

      const isColor = typeof value === 'string' && colorRegex.test(value);

      return (
        <div key={currentPath} style={{ marginLeft: '20px' }}>
          <strong>{key}:</strong> {String(value)}
          {isColor && (
            <div
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: value,
                marginLeft: '10px',
                border: '1px solid black',
                cursor: 'pointer'
              }}
              onClick={() => handleColorClick(value, currentPath)}
            ></div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {renderJson(data)}
      {displayColorPicker && (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={() => setDisplayColorPicker(false)}/>
          <SketchPicker color={currentColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
