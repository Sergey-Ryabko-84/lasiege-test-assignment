const { Product, productsPostSchema } = require("./product");
const { Category, categoriesPostSchema } = require("./category");
const { Cart, cartPostSchema } = require("./cart");
const { Order, ordersPostSchema } = require("./order");

module.exports = {
  Product,
  Category,
  Cart,
  Order,
  productsPostSchema,
  categoriesPostSchema,
  cartPostSchema,
  ordersPostSchema,
};
