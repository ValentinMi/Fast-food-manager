const { Product } = require("./models/product");
const { PayedOrder } = require("./models/payedOrder");
const mongoose = require("mongoose");
const moment = require("moment");
const config = require("config");

const productsData = [
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

const payedOrderData = [
  {
    products: [
      {
        name: "Hamburger",
        quantity: 3,
        price: 12
      },
      {
        name: "Tacos",
        quatity: 2,
        price: 15
      }
    ],
    totalPrice: 27,
    date: moment().toJSON()
  }
];

async function seed() {
  await mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Product.deleteMany({});
  await PayedOrder.deleteMany({});

  await Product.insertMany(productsData);
  await PayedOrder.insertMany(payedOrderData);

  mongoose.disconnect();

  console.info("Done !");
}

seed();
