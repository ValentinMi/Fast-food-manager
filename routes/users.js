const _ = require("lodash");
const bcrypt = require("bcrypt");
const moment = require("moment");
// Auth middleware WIP
// Admin middleware WIP
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// REGISTER POST
router.post("/", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // Create new User
  user = new User({
    email: req.body.email,
    password: req.body.password,
    registerDate: moment().toJSON()
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Hash password confirmation
  const passwordConfirmation = await bcrypt.hash(
    req.body.passwordConfirmation,
    salt
  );

  // Compare passwords
  if (user.password !== passwordConfirmation)
    return res
      .status(400)
      .send("Password and password confirmation don't match");

  // Save user
  await user.save();

  // Create JWT
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["id", "email"]));
});

module.exports = router;
