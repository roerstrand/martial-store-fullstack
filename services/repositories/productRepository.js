const Product = require("../models/productModel");

const getAllProducts = async () => {
  return await Product.find();
};

const getProduct = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (body) => {
  const product = await Product.create(body);

  return product;
};

const updateProduct = async (id, body) => {
  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  return product;
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
