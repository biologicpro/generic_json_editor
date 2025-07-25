export const getTemplates = async () => {
  // In a real application, this would fetch the list of templates from an API.
  // For this example, we'll just hardcode the list.
  return ['weirdo.json'];
};

export const getTemplate = async (templateName) => {
  const response = await fetch(`/templates/${templateName}`);
  const data = await response.json();
  return data;
};
