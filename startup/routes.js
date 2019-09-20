const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const products = require("../routes/products");
const pendingOrders = require("../routes/pendingOrders");
const payedOrders = require("../routes/payedOrders");
const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/products", products);
  app.use("/api/pendingOrders", pendingOrders);
  app.use("/api/payedOrders", payedOrders);
  app.use(error);
};
