import { order, getCart } from "../api";

document.addEventListener("DOMContentLoaded", () => {
  displayTotalCost();

  const orderForm = document.getElementById("order-form");
  if (!orderForm) return;

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = document.getElementById("name").value;
    const userAddress = document.getElementById("address").value;
    const user = { name: userName, address: userAddress };

    try {
      const response = await order({ user });

      if (response) {
        alert("Order confirmed! Thank you for your purchase.");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("There was an issue with your order. Please try again.");
    }
  });
});

async function displayTotalCost() {
  try {
    const cartItems = await getCart();
    const orderItemsContainer = document.getElementById("order-items");

    let totalCost = 0;
    cartItems.forEach((item) => {
      const itemCost = item.productId.price * item.quantity;
      totalCost += itemCost;

      const orderItem = document.createElement("li");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <p>${item.productId.name}</p>
        <p>$${item.productId.price.toLocaleString()} x ${item.quantity} pcs.</p>
      `;
      orderItemsContainer.appendChild(orderItem);
    });

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
  }
}
