import React, { useState } from 'react';
import EditorValue from './EditorValue';
import { editorTypes, validConversions } from '../utils/constants';

const detectType = (value) => {
  const type = typeof value;
  if (value === null) return 'null';
  if (type === 'object') {
    return Array.isArray(value) ? 'array' : 'object';
  }
  if (type === 'string') {
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(value)) return 'color';
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return 'datetime';
  }
  return type;
};

const EditorItem = ({ itemKey, value, path, onItemChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentType, setCurrentType] = useState(detectType(value));

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleValueChange = (newValue) => {
    onItemChange(path, newValue);
  };

  const handleDelete = () => {
    onItemChange(path, '__DELETE__'); // Special value to indicate deletion
  };

  const handleMoveUp = () => {
    onItemChange(path, '__MOVE_UP__'); // Special value to indicate move up
  };

  const handleMoveDown = () => {
    onItemChange(path, '__MOVE_DOWN__'); // Special value to indicate move down
  };

  const handleAdd = () => {
    // For now, add a null item. Type conversion will handle changing it.
    onItemChange([...path, 'new_item'], null); // Special value to indicate add
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    let convertedValue = value;

    switch (newType) {
      case 'string':
        convertedValue = String(value);
        break;
      case 'number':
        convertedValue = Number(value);
        if (isNaN(convertedValue)) convertedValue = 0;
        break;
      case 'boolean':
        convertedValue = Boolean(value);
        break;
      case 'object':
        convertedValue = {};
        break;
      case 'array':
        convertedValue = [];
        break;
      case 'null':
        convertedValue = null;
        break;
      case 'color':
        convertedValue = '#000000'; // Default color
        break;
      case 'datetime':
        convertedValue = new Date().toISOString(); // Default datetime
        break;
      default:
        break;
    }
    setCurrentType(newType);
    onItemChange(path, convertedValue);
  };

  const isObjectOrArray = typeof value === 'object' && value !== null;

  return (
    <details open={isOpen} className="item">
      <summary className="key" onClick={handleToggle}>
        {isObjectOrArray && (
          <i className={`codicon codicon-${isOpen ? 'chevron-down' : 'chevron-right'}`}></i>
        )}
        <span className="name">{itemKey}</span>
        <select className="type" value={currentType} onChange={handleTypeChange}>
          {validConversions[currentType] && validConversions[currentType].map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
      </summary>
      <div className="item-btns">
        <li onClick={handleDelete} title="Delete this item">🗑️</li>
        <li onClick={handleMoveUp} title="Move up">⬆️</li>
        <li onClick={handleMoveDown} title="Move down">⬇️</li>
        {isObjectOrArray && (
          <li onClick={handleAdd} title="Add item">➕</li>
        )}
      </div>
      <div className="value-container">
        <EditorValue
          value={value}
          path={path}
          onValueChange={handleValueChange}
          onItemChange={onItemChange} // Pass down for nested EditorItems
        />
      </div>
    </details>
  );
};

export default EditorItem;