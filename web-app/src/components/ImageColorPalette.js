import React, { useState } from 'react';
import ColorThief from 'colorthief';

const ImageColorPalette = ({ onPaletteSelect }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [palette, setPalette] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 10);
        setPalette(colorPalette.map(rgb => `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`));
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <div style={{ display: 'flex', marginTop: '10px' }}>
        {palette.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: '50px',
              height: '50px',
              cursor: 'pointer'
            }}
            onClick={() => onPaletteSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageColorPalette;
