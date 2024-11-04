const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);

const productsPostSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required(),
  image: Joi.string(),
});

module.exports = { Product, productsPostSchema };
