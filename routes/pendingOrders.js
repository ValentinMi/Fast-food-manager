const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { PendingOrder, validate } = require("../models/pendingOrder");
const express = require("express");
const router = express.Router();

// GET PENDING ORDER
router.get("/:id", [auth], async (req, res) => {
  const pendingOrder = await PendingOrder.findById(req.params.id);
  if (!pendingOrder) return res.status(404).send("Pending order not found");

  res.send(pendingOrder);
});

// GET ALL PENDING ORDERS
router.get("/", [admin], async (req, res) => {
  const pendingOrders = await PendingOrder.find().select("__v");

  res.send(pendingOrders);
});

// POST NEW PENDING ORDER
router.post("/", [auth], async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new pending order
  let newPendingOrder = new PendingOrder({
    products: req.body.products,
    totalPrice: req.body.totalPrice
  });

  // Save pending order
  await newPendingOrder.save();

  res.send(newPendingOrder);
});

// DELETE PENDING ORDER
router.delete("/:id", [auth], async (req, res) => {
  const pendingOrder = await PendingOrder.findByIdAndDelete(req.params.id);

  if (!pendingOrder) return res.status(404).send("Pending order not found");

  res.send(pendingOrder);
});
