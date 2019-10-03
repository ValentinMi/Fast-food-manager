const { Product } = require("./models/product");
const { PayedOrder } = require("./models/payedOrder");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcrypt");
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

async function createUsers() {
  const salt = await bcrypt.genSalt(10);

  // Create 2 users: 1 customer & 1 admin with "password" as password
  const users = [
    new User({
      email: "test@test.fr",
      password: await bcrypt.hash("password", salt),
      registerDate: moment().toJSON()
    }),
    new User({
      email: "admin@admin.fr",
      password: await bcrypt.hash("password", salt),
      registerDate: moment().toJSON(),
      isAdmin: true
    })
  ];

  return users;
}

async function seed() {
  await mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Clear DB
  await Product.deleteMany({});
  await PayedOrder.deleteMany({});
  await User.deleteMany({});

  // Populate DB
  await Product.insertMany(productsData);
  await PayedOrder.insertMany(payedOrderData);
  await User.insertMany(await createUsers());

  mongoose.disconnect();

  console.info("Done !");
}

seed();
