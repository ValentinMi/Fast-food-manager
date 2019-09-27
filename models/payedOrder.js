const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment");

const payedOrderSchema = new mongoose.Schema({
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
});

// Create model with his schema
const PayedOrder = mongoose.model("PayedOrder", payedOrderSchema);

// Validation
function validatePayedOrder(payedOrder) {
  const schema = {
    payedOrder: Joi.array()
  };

  return Joi.validate(payedOrder, schema);
}

exports.payedOrderSchema = payedOrderSchema;
exports.PayedOrder = PayedOrder;
exports.validate = validatePayedOrder;
