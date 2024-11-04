const API_BASE_URL = process.env.API_BASE_URL;

export const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};

export const getCount = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};

export const addProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return await response.json();
};

export const removeProduct = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove from the cart");
  }
  return await response.json();
};
