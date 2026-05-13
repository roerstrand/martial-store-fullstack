const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const {
  getProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} = require("../services/productService");

// @desc GET all contacts
// @route GET /api/contacts
// @access private
const getProducts = asyncHandler(async (req, res) => {
  const products = await getProductsService();

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }
  res.status(200).json(products);
});

// @desc GET one contact by id
// @route GET /api/contacts/:id
// @access private
const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductService(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// @desc create one contact
// @route POST /api/contacts
// @access private
const createProduct = asyncHandler(async (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) {
    res.status(400);
    throw new Error("Title and price are required for this request");
  }

  const product = await createProductService(req.body);

  res.status(201).json(product);
});

// @desc update one contact
// @route PUT /api/contacts/:id
// @access private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProductService(req.params.id, req.body);

  if (!product) {
    res.status(404);
    throw new Error("Product could not be created");
  }

  res.status(200).json(product);
});

// @desc delete one contact
// @route DELETE /api/contacts/:id
// @access private
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
