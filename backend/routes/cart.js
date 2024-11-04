const express = require("express");
const router = express.Router();
const { validateBody, isValidId } = require("../middlewares");
const { Cart, cartPostSchema } = require("../models");

router.post("/", validateBody(cartPostSchema), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      if (quantity !== undefined) {
        cartItem.quantity = quantity;
      } else {
        cartItem.quantity += 1;
      }
      await cartItem.save();
    } else {
      cartItem = new Cart({ productId, quantity: quantity ?? 1 });
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findOneAndDelete({ productId: id });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("productId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Cart.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
