import React from 'react';
import EditorItem from './EditorItem';

const EditorCollection = ({ value, path, onItemChange }) => {
  const isArray = Array.isArray(value);

  return (
    <div className="value-container">
      {Object.entries(value).map(([key, val], index) => (
        <EditorItem
          key={isArray ? `${path.join('.')}.${index}` : `${path.join('.')}.${key}`}
          itemKey={isArray ? index : key}
          value={val}
          path={[...path, isArray ? index : key]}
          onItemChange={onItemChange}
        />
      ))}
    </div>
  );
};

export default EditorCollection;
