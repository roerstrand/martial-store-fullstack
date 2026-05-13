const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
});

module.exports = mongoose.model("Product", productSchema);
