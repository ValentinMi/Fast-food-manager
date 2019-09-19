const Joi = require("joi");
const mongoose = require("mongoose");

// Create model and his schema
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    pendingOrders: Array,
    payedOrders: Array
  })
);

// Validation
function validateOrder(order) {
  const schema = {
    pendingOrders: Joi.array(),
    payedOrders: Joi.array()
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateProduct;
