const Joi = require("joi");
const mongoose = require("mongoose");

// Create model and his schema
const PendingOrder = mongoose.model(
  "PendingOrder",
  new mongoose.Schema({
    products: {
      type: Array,
      minlength: 1
    },
    totalPrice: {
      type: Number,
      min: 0
    }
  })
);

// Validation
function validatePendingOrder(pendingOrder) {
  const schema = {
    pendingOrder: Joi.array()
  };

  return Joi.validate(pendingOrder, schema);
}

exports.PendingOrder = PendingOrder;
exports.validate = validatePendingOrder;
