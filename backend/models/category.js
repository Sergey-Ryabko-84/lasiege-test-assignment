const { Schema, model } = require("mongoose");
const Joi = require("joi");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = model("Category", categorySchema);

const categoriesPostSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { Category, categoriesPostSchema };
