const express = require("express");

const tokenValidator = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct, tokenValidator);

router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct, tokenValidator)
  .delete(deleteProduct, tokenValidator);

module.exports = router;
