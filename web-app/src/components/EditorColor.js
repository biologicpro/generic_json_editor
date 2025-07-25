import React from 'react';

const EditorColor = ({ value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <label>
      <input type="color" value={value} onChange={handleChange} />
      <span className="value">{value}</span>
    </label>
  );
};

export default EditorColor;
