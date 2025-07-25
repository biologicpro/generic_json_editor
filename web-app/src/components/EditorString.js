import React, { useState } from 'react';

const EditorString = ({ value, onValueChange }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    onValueChange(currentValue);
  };

  return (
    <span
      className="editable-text"
      contentEditable="true"
      onBlur={handleBlur}
      onInput={handleChange}
      suppressContentEditableWarning={true}
    >
      {currentValue}
    </span>
  );
};

export default EditorString;
