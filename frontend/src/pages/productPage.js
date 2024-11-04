import { addProduct, fetchProduct, getCount } from "../api";
import { updateButton, updateCartCount } from "../utils";

document.addEventListener("DOMContentLoaded", async () => {
  const productDetails = document.getElementById("product-details");
  if (!productDetails) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const productImage = document.getElementById("product-image");
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const addToCartButton = document.getElementById("add-to-cart");
  const errorMessage = document.getElementById("error-message");

  try {
    await updateCartCount();
    await updateButton();
    const product = await fetchProduct(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    productImage.src = product.imageUrl || "";
    productName.textContent = product.name;
    productPrice.textContent = `$${product.price.toFixed(2)}`;

    addToCartButton.addEventListener("click", () => addToCart(productId));
  } catch (error) {
    console.error("Error loading product:", error);
    errorMessage.textContent = "Error loading product details.";
  }
});

async function addToCart(productId) {
  try {
    const response = await addProduct({ productId });
    console.log(`Product ${productId} added to cart!`);

    await updateButton();
    await updateCartCount();
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    alert("Failed to add product to cart. Please try again.");
  }
}
