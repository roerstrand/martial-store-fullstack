const express = require("express");

const tokenValidator = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCurrentUserProducts,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(tokenValidator, createProduct);

router.get("/myProducts", tokenValidator, getCurrentUserProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(tokenValidator, updateProduct)
  .delete(tokenValidator, deleteProduct);

module.exports = router;
