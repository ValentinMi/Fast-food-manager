const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { PayedOrder, validate } = require("../models/payedOrder");
const express = require("express");
const router = express.Router();
const moment = require("moment");

// GET PAYED ORDER
router.get("/:id", [auth], [auth], async (req, res) => {
  const payedOrder = await PayedOrder.findById(req.params.id);
  if (!payedOrder) return res.status(404).send("Payed Order not found");

  res.send(payedOrder);
});

// GET ALL PAYED ORDERS
router.get("/", [auth], [admin], async (req, res) => {
  const payedOrders = await PayedOrder.find();

  res.send(payedOrders);
});

// POST NEW PAYED ORDER
router.post("/", [auth], async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newPayedOrder = new PayedOrder({
    products: req.body.products,
    totalPrice: req.body.totalPrice,
    date: moment().toJSON(),
    user: req.user
  });

  // Save new payed order
  await newPayedOrder.save();

  res.send(newPayedOrder);
});

// UPDATE PAYED ORDER
router.put("/:id", [auth], [admin], async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const payedOrder = await PayedOrder.findOneAndUpdate(
    req.params.id,
    req.newOrder,
    { new: true }
  );

  if (!payedOrder) return res.status(404).send("Product not found");

  res.send(payedOrder);
});

// DELETE PAYED ORDER
router.delete("/:id", [auth], [admin], async (req, res) => {
  const payedOrder = await PayedOrder.findOneAndDelete(req.params.id);

  if (!payedOrder) return res.status(404).send("Product not found");

  res.send(payedOrder);
});

module.exports = router;
