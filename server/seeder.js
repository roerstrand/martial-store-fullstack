const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/productModel");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    name: "Admin",
    email: "admin@apexcore.com",
    password: "admin1234",
  },
  {
    name: "Robin",
    email: "robin@apexcore.com",
    password: "robin1234",
  },
  {
    name: "Customer",
    email: "customer@apexcore.com",
    password: "customer1234",
  },
];

const products = (userId) => [
  {
    user_id: userId,
    title: "BJJ Gi",
    price: 79,
    description: "Premium Brazilian Jiu-Jitsu gi for training and competition.",
    image: "bjj_gi.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Women's Boxing Startkit",
    price: 29,
    description: "Complete boxing starter kit for women.",
    image: "womens_boxing_startkit.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Shin Guards",
    price: 39,
    description: "Protective shin guards for Muay Thai and kickboxing.",
    image: "shin_guards.jpg",
    rating: 5,
  },
  {
    user_id: userId,
    title: "Boxing Bag",
    price: 199,
    description: "Heavy duty boxing bag for intense training sessions.",
    image: "boxing_bag.jpg",
    rating: 5,
  },
  {
    user_id: userId,
    title: "Black Boxing Gloves",
    price: 49,
    description: "Durable boxing gloves for training and sparring.",
    image: "black_boxing_gloves.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Boxing Helmet",
    price: 59,
    description: "Full protection boxing helmet for safe sparring.",
    image: "boxing_helmet.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Karate Kimono",
    price: 69,
    description: "Traditional karate gi for training and grading.",
    image: "karate_kimono.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Boxing Pads",
    price: 44,
    description: "Focus pads for pad work and technique training.",
    image: "boxing_pads.jpg",
    rating: 5,
  },
  {
    user_id: userId,
    title: "Boxing Boots",
    price: 89,
    description: "Lightweight boxing boots for speed and ankle support.",
    image: "boxing_boots.jpg",
    rating: 4,
  },
  {
    user_id: userId,
    title: "Snake Skin Boxing Gloves",
    price: 69,
    description: "Premium snake skin pattern boxing gloves for style and performance.",
    image: "margo-evardson-YYouq46SOXw-unsplash.jpg",
    rating: 5,
  },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");

  await Product.deleteMany();
  await User.deleteMany();
  console.log("Collections cleared");

  const createdUsers = [];
  for (const userData of users) {
    const hashed = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashed });
    createdUsers.push(user);
    console.log(`User created: ${user.email}`);
  }

  await Product.insertMany(products(createdUsers[0]._id));
  console.log("Products seeded");

  await mongoose.disconnect();
  console.log("Done");
};

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
