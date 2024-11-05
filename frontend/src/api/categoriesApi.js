// const API_BASE_URL = process.env.API_BASE_URL;

export const fetchCategories = async () => {
  // const response = await fetch(`${API_BASE_URL}/categories`);
  const response = await fetch(`/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};
