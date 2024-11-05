import { getCount } from "../api";

export async function updateEmptyCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const checkoutContainer = document.getElementById("checkout");

  if (!cartItemsContainer || !checkoutContainer) return;

  try {
    cartItemsContainer.style.fontSize = "22px";
    cartItemsContainer.style.textAlign = "center";
    cartItemsContainer.innerHTML = "🛒 the cart is empty";
    checkoutContainer.style.visibility = "hidden";
  } catch (error) {
    console.error("Failed to update cart count:", error);
  }
}
