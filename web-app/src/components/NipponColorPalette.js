import React, { useState, useEffect } from 'react';

const NipponColorPalette = ({ onPaletteSelect }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch('/nippon-colors.json')
      .then(response => response.json())
      .then(data => setColors(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color.hex,
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            margin: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '1px 1px 1px black'
          }}
          onClick={() => onPaletteSelect(color.hex)}
        >
          {color.name}
        </div>
      ))}
    </div>
  );
};

export default NipponColorPalette;
