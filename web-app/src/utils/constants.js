export const editorSubTypes = Object.freeze({
    color: "string",    // input type="color"
    datetime: "string", // input type="date"
});

export const editorTypes = Object.freeze([
    "null",
    "string",
    "number",
    "boolean",
    "object",
    "array",
    // unroll special types
    ...(Object.keys(editorSubTypes))
]);

export const validConversions = Object.freeze({
    string: ["string", "number", "boolean", "color", "datetime", "null"],
    number: ["number", "string", "boolean", "null"],
    boolean: ["boolean", "string", "null"],
    array: ["array", "null"],
    object: ["object", "null"],
    color: ["color", "string", "null"],
    datetime: ["datetime", "string", "null"],
    null: editorTypes,  // any
});
