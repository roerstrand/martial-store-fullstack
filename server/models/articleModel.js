const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  excerpt: {
    type: String,
    required: [true, "Please add an excerpt"],
  },
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  author: {
    type: String,
    required: [true, "Please add an author"],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    enum: ["bjj", "boxing", "muaythai", "karate", "general"],
    required: [true, "Please add a category"],
  },
});

module.exports = mongoose.model("Article", articleSchema);
