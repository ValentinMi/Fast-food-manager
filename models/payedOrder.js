const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment");

// Create model and his schema
const PayedOrder = mongoose.model(
  "PayedOrder",
  new mongoose.Schema({
    products: {
      type: Array,
      minlength: 1
    },
    totalPrice: {
      type: Number,
      min: 0
    },
    date: {
      type: Date,
      required: true
    }
  })
);

// Validation
function validatePayedOrder(payedOrder) {
  const schema = {
    payedOrder: Joi.array()
  };

  return Joi.validate(payedOrder, schema);
}

exports.PayedOrder = PayedOrder;
exports.validate = validatePayedOrder;
