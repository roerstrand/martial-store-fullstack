const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    auto: false,
  },
  title: {
    type: String,
    required: [true, "Please add a name"],
  },
  price: {
    type: Number,
    required: [true, "Please add an email"],
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  sale: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    enum: ["bjj", "boxing", "muaythai", "karate"],
    required: [true, "Please add a category"],
  },
});

module.exports = mongoose.model("Product", productSchema);
