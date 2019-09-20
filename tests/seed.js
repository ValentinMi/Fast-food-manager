const { Product } = require("../models/product");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Hamburger",
    price: 4,
    stock: 13
  },
  {
    name: "Hot-Dog",
    price: 2,
    stock: 10
  },
  {
    name: "Salade César",
    price: 5,
    stock: 8
  },
  {
    name: "Pizza",
    price: 10,
    stock: 7
  },
  {
    name: "Tacos",
    price: 7.5,
    stock: 4
  }
];

async function seed() {
  await mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Product.deleteMany({});

  await Product.insertMany(data);

  mongoose.disconnect();

  console.info("Done !");
}

seed();
