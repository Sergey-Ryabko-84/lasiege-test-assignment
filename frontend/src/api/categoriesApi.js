const API_BASE_URL = process.env.API_BASE_URL;

const pathToCategories = `${API_BASE_URL}/categories`;
console.log("API_BASE_URL:", API_BASE_URL);
console.log("${API_BASE_URL}/categories", pathToCategories);

export const fetchCategories = async () => {
  const response = await fetch(pathToCategories);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};
