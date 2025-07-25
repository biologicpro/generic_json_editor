import React from 'react';

const RandomColorGenerator = ({ onColorGenerate }) => {
  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    onColorGenerate(randomColor);
  };

  return (
    <button onClick={generateRandomColor}>Generate Random Color</button>
  );
};

export default RandomColorGenerator;
