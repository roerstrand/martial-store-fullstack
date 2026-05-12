const Product = require("../models/productModel");

const getProductsService = async () => {
  const products = await Product.find();

  return products;
};

const getProductService = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const createProductService = async (body) => {
  const product = await Product.create(body);
  return product;
};

const updateProductService = async (id, body) => {
  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  return product;
};

const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
};

module.exports = {
  getProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
};
