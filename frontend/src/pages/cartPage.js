import { getCart, addProduct, removeProduct } from "../api";
import { updateCartCount, updateEmptyCart } from "../utils";

document.addEventListener("DOMContentLoaded", async () => {
  await renderCart();
});

async function renderCart() {
  try {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalCostContainer = document.getElementById("total-cost");

    await updateCartCount();
    const cartItems = await getCart();
    if (!cartItems.length) {
      updateEmptyCart();
      return;
    }

    cartItemsContainer.innerHTML = "";

    let totalCost = 0;
    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";

      itemElement.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.productId.imageUrl}" 
            alt="${item.productId.name}" class="cart-item-image">
          <span class="cart-item-name">${item.productId.name}</span>
          <span class="cart-item-price">$${(item.productId.price * item.quantity).toFixed(2)}</span>
          <button class="decrease-btn" data-id="${item.productId._id}">-</button>
          <input class="quantity" data-id="${item.productId._id}" 
            value="${item.quantity}" min="1" />
          <button class="increase-btn" data-id="${item.productId._id}">+</button>
          <button class="remove-btn" data-id="${item.productId._id}">🗑️ delete</button>
        </div>
      `;

      cartItemsContainer.appendChild(itemElement);
      totalCost += item.productId.price * item.quantity;
    });

    totalCostContainer.textContent = totalCost.toFixed(2);

    cartItemsContainer.addEventListener("click", handleQuantityChange);
    cartItemsContainer.addEventListener("click", handleRemoveProduct);
  } catch (error) {
    console.error("Failed to render cart:", error);
  }
}

async function handleQuantityChange(event) {
  const target = event.target;
  const productId = target.dataset.id;

  if (!productId) return;

  const quantityInput = document.querySelector(`input.quantity[data-id="${productId}"]`);
  let newQuantity = parseInt(quantityInput.value);

  if (target.classList.contains("increase-btn")) {
    newQuantity += 1;
  } else if (target.classList.contains("decrease-btn") && newQuantity > 1) {
    newQuantity -= 1;
  }

  quantityInput.value = newQuantity;

  try {
    await addProduct({ productId, quantity: newQuantity });
    await renderCart();
  } catch (error) {
    console.error("Failed to update product quantity:", error);
    alert("Failed to update quantity. Please try again.");
  }
}

async function handleRemoveProduct(event) {
  if (!event.target.classList.contains("remove-btn")) return;

  const productId = event.target.dataset.id;

  try {
    await removeProduct(productId);
    await renderCart();
    await updateCartCount();
  } catch (error) {
    console.error("Failed to remove product from cart:", error);
    alert("Failed to remove product. Please try again.");
  }
}
