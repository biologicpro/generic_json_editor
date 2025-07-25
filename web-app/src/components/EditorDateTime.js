import React from 'react';

const EditorDateTime = ({ value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value + 'Z'); // Add Z for UTC
  };

  // Format the date for datetime-local input (YYYY-MM-DDTHH:mm:ss.sss)
  const formattedValue = new Date(value).toISOString().slice(0, 23);

  return (
    <label>
      <input type="datetime-local" step="0.001" value={formattedValue} onChange={handleChange} />
      <span className="value">{value}</span>
    </label>
  );
};

export default EditorDateTime;
