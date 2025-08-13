require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Card = require("../models/card.model");

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
}

async function run() {
  await connect();
  await User.deleteMany({});
  await Card.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("Aa1234!", salt);

  const regular = await User.create({
    name: { first: "first", middle: "", last: "user" },
    phone: "050-0000000",
    email: "first@gmail.com",
    password: hash,
    image: {},
    address: {
      state: "not defined",
      country: "israel",
      city: "tel-aviv",
      street: "magnive",
      houseNumber: 5,
      zip: 0,
    },
    isBusiness: false,
    isAdmin: false,
  });

  const business = await User.create({
    name: { first: "biz", middle: "", last: "user" },
    phone: "050-0000000",
    email: "biz@gmail.com",
    password: hash,
    image: {},
    address: {
      state: "not defined",
      country: "israel",
      city: "tel-aviv",
      street: "magnive",
      houseNumber: 5,
      zip: 0,
    },
    isBusiness: true,
    isAdmin: false,
    bizNumber: 1234567,
  });

  const admin = await User.create({
    name: { first: "admin", middle: "", last: "user" },
    phone: "050-0000000",
    email: "admin@gmail.com",
    password: hash,
    image: {},
    address: {
      state: "not defined",
      country: "israel",
      city: "tel-aviv",
      street: "magnive",
      houseNumber: 5,
      zip: 0,
    },
    isBusiness: true,
    isAdmin: true,
    bizNumber: 7654321,
  });

  const cards = await Card.insertMany([
    {
      title: "test123",
      subtitle: "testing",
      description: "testing 123",
      phone: "050-0000000",
      email: "testing@gmail.com",
      web: "https://www.test.co.il",
      image: {},
      address: {
        state: "not defined",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 3,
        zip: 0,
      },
      bizNumber: 6401563,
      user_id: business._id,
    },
    {
      title: "card two",
      subtitle: "testing",
      description: "another",
      phone: "050-0000000",
      email: "testing2@gmail.com",
      web: "https://www.test.co.il",
      image: {},
      address: {
        state: "not defined",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 10,
        zip: 0,
      },
      bizNumber: 6401564,
      user_id: business._id,
    },
    {
      title: "card three",
      subtitle: "testing",
      description: "third",
      phone: "050-0000000",
      email: "testing3@gmail.com",
      web: "https://www.test.co.il",
      image: {},
      address: {
        state: "not defined",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 12,
        zip: 0,
      },
      bizNumber: 6401565,
      user_id: admin._id,
    },
  ]);

  console.log(
    `Seeded: users=${[regular.email, business.email, admin.email].join(
      ", "
    )}, cards=${cards.length}`
  );
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
