import React, { useState, useEffect } from 'react';

const NipponColorPalette = ({ onPaletteSelect }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch('/nippon-colors.json')
      .then(response => response.json())
      .then(data => setColors(data));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginTop: '10px' }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: `#${color.color}`,
            width: '80px',
            height: '80px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '1px 1px 1px black',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '0.8em'
          }}
          onClick={() => onPaletteSelect(`#${color.color}`)}
        >
          <span>{color.name}</span>
          <span>{color.cname}</span>
          <span>#{color.color}</span>
        </div>
      ))}
    </div>
  );
};

export default NipponColorPalette;
