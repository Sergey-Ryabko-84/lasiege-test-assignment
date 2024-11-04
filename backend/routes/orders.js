const express = require("express");
const router = express.Router();
const { validateBody } = require("../middlewares");
const { Cart, Order, ordersPostSchema } = require("../models");

router.post("/", validateBody(ordersPostSchema), async (req, res) => {
  try {
    const { cartId, user } = req.body;
    const cart = await Cart.findById(cartId).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = new Order({ items: cart.items, totalAmount, user });
    await order.save();

    await Cart.findByIdAndDelete(cartId);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
