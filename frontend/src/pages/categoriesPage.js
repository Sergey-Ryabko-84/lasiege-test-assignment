import { fetchProducts, fetchCategories } from "../api";
import { updateCartCount } from "../utils";

document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");
  const categorySelect = document.getElementById("category-select");

  if (!productList) return;

  try {
    await updateCartCount();
    const categories = await fetchCategories();
    categorySelect.innerHTML = "<option value=''>All Categories</option>";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category._id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });

    const products = await fetchProducts();
    renderProducts(products);

    categorySelect.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      const filteredProducts = selectedCategory
        ? products.filter((product) => product.categoryId === selectedCategory)
        : products;
      renderProducts(filteredProducts);
    });
  } catch (error) {
    console.error("Error loading data:", error);
    productList.innerHTML = "<li>Error loading products</li>";
  }
});

function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const container = document.createElement("li");
    container.className = "product-container";

    container.addEventListener("click", () => {
      window.location.href = `product.html?id=${product._id}`;
    });

    const image = document.createElement("img");
    if (product.imageUrl) {
      image.src = product.imageUrl;
      image.alt = product.name;
      image.className = "product-image";
      container.appendChild(image);
    }

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `$${product.price.toFixed(2)}`;

    container.appendChild(name);
    container.appendChild(price);
    productList.appendChild(container);
  });
}
