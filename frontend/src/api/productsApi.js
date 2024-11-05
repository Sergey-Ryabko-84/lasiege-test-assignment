// const API_BASE_URL = process.env.API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

export const fetchProduct = async (productId) => {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};
