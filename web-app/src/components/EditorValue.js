import React from 'react';
import EditorString from './EditorString';
import EditorNumber from './EditorNumber';
import EditorBool from './EditorBool';
import EditorColor from './EditorColor';
import EditorDateTime from './EditorDateTime';
import EditorCollection from './EditorCollection';

const EditorValue = ({ value, path, onValueChange, onItemChange }) => {
  const type = typeof value;

  if (value === null) {
    return <span>null</span>;
  }

  switch (type) {
    case 'string':
      // Basic color detection for now, will be more robust later
      if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(value)) {
        return <EditorColor value={value} onValueChange={onValueChange} />;
      } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
        return <EditorDateTime value={value} onValueChange={onValueChange} />;
      }
      return <EditorString value={value} onValueChange={onValueChange} />;
    case 'number':
      return <EditorNumber value={value} onValueChange={onValueChange} />;
    case 'boolean':
      return <EditorBool value={value} onValueChange={onValueChange} />;
    case 'object':
      return <EditorCollection value={value} path={path} onItemChange={onItemChange} />;
    default:
      return <span>{String(value)}</span>;
  }
};

export default EditorValue;