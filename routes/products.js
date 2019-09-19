// Auth middleware WIP
// Admin middleware WIP
const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

// GET PRODUCT
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params._id);
  if (!product) return res.status(404).send("Product not found");

  res.send(product);
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find()
    .select("__v")
    .sort("name");

  res.send(products);
});

// POST NEW PRODUCT
router.post("/", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if product already exist
  let product = await Product.findOne({ name: req.body.name });
  if (product) return res.status(400).send("Product already exist");

  // Create new Product
  newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  });

  // Save product
  await newProduct.save();
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  // Validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock
    },
    { new: true }
  );

  if (!product) return res.status(404).send("Product not found");

  res.send(product);
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndDelete(req.params.id);

  if (!product) return res.status(404).send("Product not found");

  res.send(product);
});
