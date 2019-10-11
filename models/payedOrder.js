const Joi = require("joi");
const mongoose = require("mongoose");

const payedOrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    minlength: 1,
    required: true
  },
  totalPrice: {
    type: Number,
    min: 0,
    required: true
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
    products: Joi.array()
      .min(1)
      .required(),
    totalPrice: Joi.number().required(),
    date: Joi.date()
  };

  return Joi.validate(payedOrder, schema);
}

exports.payedOrderSchema = payedOrderSchema;
exports.PayedOrder = PayedOrder;
exports.validate = validatePayedOrder;
