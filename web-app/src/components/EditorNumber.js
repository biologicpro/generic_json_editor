import React, { useState } from 'react';
import { LosslessNumber } from 'lossless-json';

const EditorNumber = ({ value, onValueChange }) => {
  const [currentValue, setCurrentValue] = useState(value.toString());

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    try {
      const num = new LosslessNumber(currentValue);
      onValueChange(num.value);
    } catch (e) {
      console.error("Invalid number:", e);
      // Revert to original value on error
      setCurrentValue(value.toString());
    }
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

export default EditorNumber;
