const API_BASE_URL = process.env.API_BASE_URL;

export const order = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return await response.json();
};
