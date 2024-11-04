import { getCount } from "../api";

export async function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  try {
    const response = await getCount();
    const isCartEmpty = response.count === 0;

    cartCount.textContent = response.count;
    cartCount.hidden = isCartEmpty ? true : false;
    cartCount.style.backgroundColor = isCartEmpty ? "" : "#4caf50";
  } catch (error) {
    console.error("Failed to update cart count:", error);
  }
}
