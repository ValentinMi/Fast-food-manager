const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  registerDate: {
    type: Date,
    required: true
  },
  isAdmin: Boolean,
  pendingOrder: Array,
  payedOrder: Array
});

// Gen AuthToken method
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

// Create model
const User = mongoose.model("User", userSchema);

// Validation
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    passwordConfirm: Joi.string()
      .min(5)
      .max(255)
  };

  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
