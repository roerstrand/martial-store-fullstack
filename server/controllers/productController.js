const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const {
  getProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} = require("../services/productService");

const getProducts = asyncHandler(async (req, res) => {
  const products = await getProductsService();

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductService(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) {
    res.status(400);
    throw new Error("Title and price are required for this request");
  }

  const product = await createProductService(req.body);

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProductService(req.params.id, req.body);

  if (!product) {
    res.status(404);
    throw new Error("Product could not be created");
  }

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await deleteProductService(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Could not find product to be deleted");
  }

  res.status(200).json(product);
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
