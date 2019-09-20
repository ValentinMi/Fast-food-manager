const Joi = require("joi");
const mongoose = require("mongoose");

//  Create model and his schema
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 2,
      maxlength: 255,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    quantity: {
      type: Number,
      min: 1
    },
    stock: {
      type: Number,
      min: 0,
      required: true
    }
  })
);

// Validation
function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    price: Joi.number()
      .min(0)
      .required(),
    stock: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
