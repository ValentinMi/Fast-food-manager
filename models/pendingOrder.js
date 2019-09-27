const Joi = require("joi");
const mongoose = require("mongoose");

const pendingOrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    minlength: 1
  },
  totalPrice: {
    type: Number,
    min: 0
  }
});

// Create model with his schema
const PendingOrder = mongoose.model("PendingOrder", pendingOrderSchema);

// Validation
function validatePendingOrder(pendingOrder) {
  const schema = {
    pendingOrder: Joi.array()
  };

  return Joi.validate(pendingOrder, schema);
}

exports.pendingOrderSchema = pendingOrderSchema;
exports.PendingOrder = PendingOrder;
exports.validate = validatePendingOrder;
