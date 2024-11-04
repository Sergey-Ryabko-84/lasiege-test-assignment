const { Schema, model } = require("mongoose");
const Joi = require("joi");

const orderSchema = new Schema({
  items: [
    {
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
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

const ordersPostSchema = Joi.object({
  cartId: Joi.string().required(),
  user: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
  }),
});

module.exports = { Order, ordersPostSchema };
