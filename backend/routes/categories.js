const express = require("express");
const router = express.Router();
const { validateBody } = require("../middlewares");
const { Category, categoriesPostSchema } = require("../models");

router.post("/", validateBody(categoriesPostSchema), async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
