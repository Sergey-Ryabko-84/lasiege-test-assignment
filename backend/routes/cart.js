const express = require("express");
const router = express.Router();
const { validateBody, isValidId } = require("../middlewares");
const { Cart, cartPostSchema } = require("../models");

router.post("/", validateBody(cartPostSchema), async (req, res) => {
  try {
    const { items } = req.body;

    const cart = new Cart({ items });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("items.productId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isValidId, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const totalAmount = cart.items?.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    res.status(200).json({ items: cart.items, totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
