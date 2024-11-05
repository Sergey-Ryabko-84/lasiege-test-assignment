const express = require("express");
const router = express.Router();
const { validateBody } = require("../middlewares");
const { Cart, Order, ordersPostSchema } = require("../models");

router.post("/", validateBody(ordersPostSchema), async (req, res) => {
  try {
    const { user } = req.body;
    const items = await Cart.find().populate("productId");

    if (!items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = new Order({ items, totalAmount, user });
    await order.save();

    await Cart.deleteMany({});

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
