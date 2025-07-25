import React from 'react';

const ColorTools = ({ onColorGenerate, onRandomlyAssignNipponColors }) => {
  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    onColorGenerate(randomColor);
  };

  return (
    <div>
      <button onClick={generateRandomColor}>Generate Random Color</button>
      <button onClick={onRandomlyAssignNipponColors}>Randomly Assign Nippon Colors</button>
    </div>
  );
};

export default ColorTools;