const express = require("express");

const tokenValidator = require("../middleware/validateTokenHandler");
const adminValidator = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCurrentUserProducts,
} = require("../controllers/productController");

router
  .route("/")
  .get(getProducts)
  .post(tokenValidator, adminValidator, createProduct);

router.get("/myProducts", tokenValidator, getCurrentUserProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(tokenValidator, adminValidator, updateProduct)
  .delete(tokenValidator, adminValidator, deleteProduct);

module.exports = router;
