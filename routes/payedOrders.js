const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { PayedOrder, validate } = require("../models/payedOrder");
const express = require("express");
const router = express.Router();

// GET PAYED ORDER
router.get("/:id", async (req, res) => {
  const payedOrder = await PayedOrder.findById(req.params.id);
  if (!payedOrder) return res.status(404).send("Payed Order not found");

  res.send(payedOrder);
});

// GET ALL PAYED ORDERS
router.get("/", async (req, res) => {
  const payedOrders = await PayedOrder.find().select("__v");

  res.send(payedOrders);
});

// POST NEW PAYED ORDER
router.post("/", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newPayedOrder = new PayedOrder({
    products: req.body.products,
    totalPrice: req.body.totalPrice
  });

  // Save new payed order
  await newPayedOrder.save();

  res.send(newPayedOrder);
});

module.exports = router;
