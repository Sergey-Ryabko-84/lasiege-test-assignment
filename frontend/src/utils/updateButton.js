import { getCart } from "../api";

export async function updateButton() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const addToCartButton = document.getElementById("add-to-cart");
  const cartLink = document.getElementById("cart-link");
  if (!addToCartButton || !cartLink) return;

  try {
    const response = await getCart();
    const isProductInTheCart = response.some((item) => item.productId._id === productId);
    console.log("isProductInTheCart", isProductInTheCart);

    addToCartButton.hidden = isProductInTheCart ? true : false;
    addToCartButton.style.visibility = isProductInTheCart ? "hidden" : "visible";
    cartLink.hidden = isProductInTheCart ? false : true;
    cartLink.style.visibility = isProductInTheCart ? "visible" : "hidden";
  } catch (error) {
    console.error("Failed to update cart count:", error);
  }
}
