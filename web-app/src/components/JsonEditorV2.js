import React from 'react';
import EditorItem from './EditorItem';

const JsonEditorV2 = ({ data, onDataChange }) => {
  const handleItemChange = (path, newValue) => {
    const newData = JSON.parse(JSON.stringify(data)); // Deep copy
    let current = newData;
    let parent = null;
    let keyInParent = null;

    // Traverse to the item's parent
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    parent = current;
    keyInParent = path[path.length - 1];

    if (newValue === '__DELETE__') {
      if (Array.isArray(parent)) {
        parent.splice(keyInParent, 1);
      } else if (parent) {
        delete parent[keyInParent];
      }
    } else if (newValue === '__MOVE_UP__') {
      if (Array.isArray(parent) && keyInParent > 0) {
        const temp = parent[keyInParent];
        parent[keyInParent] = parent[keyInParent - 1];
        parent[keyInParent - 1] = temp;
      } else if (!Array.isArray(parent) && parent) {
        // For objects, moving up means reordering keys. This is more complex
        // and usually not directly supported in JSON. For now, we'll skip it.
        console.warn("Moving items up in objects is not directly supported.");
      }
    } else if (newValue === '__MOVE_DOWN__') {
      if (Array.isArray(parent) && keyInParent < parent.length - 1) {
        const temp = parent[keyInParent];
        parent[keyInParent] = parent[keyInParent + 1];
        parent[keyInParent + 1] = temp;
      } else if (!Array.isArray(parent) && parent) {
        // For objects, moving down means reordering keys. This is more complex
        // and usually not directly supported in JSON. For now, we'll skip it.
        console.warn("Moving items down in objects is not directly supported.");
      }
    } else if (keyInParent === 'new_item') {
        // This is an add operation, the new value is the actual value
        if (Array.isArray(parent)) {
            parent.push(newValue);
        } else {
            // Generate a unique key for new object properties
            let newKey = `new_property_${Object.keys(parent).length}`;
            while (parent.hasOwnProperty(newKey)) {
                newKey = `new_property_${Math.floor(Math.random() * 10000)}`;
            }
            parent[newKey] = newValue;
        }
    } else {
      if (parent) {
        parent[keyInParent] = newValue;
      }
    }
    onDataChange(newData);
  };

  return (
    <div id="jsonContainer">
      {Object.entries(data).map(([key, value]) => (
        <EditorItem
          key={key}
          itemKey={key}
          value={value}
          path={[key]}
          onItemChange={handleItemChange}
        />
      ))}
    </div>
  );
};

export default JsonEditorV2;