const API_BASE_URL = process.env.API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};
