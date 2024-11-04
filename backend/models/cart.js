const { Schema, model } = require("mongoose");
const Joi = require("joi");

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = model("Cart", cartSchema);

const cartPostSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).optional(),
});

module.exports = { Cart, cartPostSchema };
