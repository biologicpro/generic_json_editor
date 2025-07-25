import React from 'react';

const JsonEditor = ({ data, onDataChange, selectedColor }) => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  const handleColorClick = (key) => {
    if (selectedColor) {
      const newData = { ...data };
      const keys = key.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = selectedColor;
      onDataChange(newData);
    }
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
              onClick={() => handleColorClick(currentPath)}
            ></div>
          )}
        </div>
      );
    });
  };

  return <div>{renderJson(data)}</div>;
};

export default JsonEditor;
