import React from 'react';

const EditorBool = ({ value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.checked);
  };

  return (
    <label className="bool-label">
      <input type="checkbox" checked={value} onChange={handleChange} />
      <span className="fake-checkbox"></span>
      <span className="value">{value.toString()}</span>
    </label>
  );
};

export default EditorBool;
