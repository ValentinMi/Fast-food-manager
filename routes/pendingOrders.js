// Auth middleware WIP
// Admin middleware WIP
const { PendingOrder, validate } = require("../models/pendingOrder");
const express = require("express");
const router = express.Router();

// GET PENDING ORDER
router.get("/:id", async (req, res) => {
  const pendingOrder = await PendingOrder.findById(req.params.id);
  if (!pendingOrder) return res.status(404).send("Pending order not found");

  res.send(pendingOrder);
});

// GET ALL PENDING ORDERS
router.get("/", async (req, res) => {
  const pendingOrders = await PendingOrder.find().select("__v");

  res.send(pendingOrders);
});

// POST NEW PENDING ORDER
router.post("/", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new pending order
  let newPendingOrder = new PendingOrder({
    products: req.body.products,
    totalPrice: req.body.totalPrice
  });

  // Save pending order
  await pendingOrder.save();

  res.send(pendingOrder);
});

// DELETE PENDING ORDER
router.delete("/:id", async (req, res) => {
  const pendingOrder = await PendingOrder.findByIdAndDelete(req.params.id);

  if (!pendingOrder) return res.status(404).send("Pending order not found");

  res.send(pendingOrder);
});
