const express = require("express");
const tokenValidator = require("../middleware/validateTokenHandler");
const adminValidator = require("../middleware/adminValidator");
const router = express.Router();

const {
  getAllCarts,
  getCart,
  getCurrentUserCart,
  createCart,
  updateCart,
  addProductToCart,
  removeProductFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} = require("../controllers/cartController");

router.route("/").get(tokenValidator, adminValidator, getAllCarts).post(tokenValidator, createCart);

router.get("/me", tokenValidator, getCurrentUserCart);

router
  .route("/:id")
  .get(tokenValidator, getCart)
  .put(tokenValidator, updateCart);

router
  .route("/:id/products")
  .post(tokenValidator, addProductToCart);

router
  .route("/:id/products/:productId")
  .delete(tokenValidator, removeProductFromCart);

router.patch("/:id/products/:productId/increase", tokenValidator, increaseQuantity);
router.patch("/:id/products/:productId/decrease", tokenValidator, decreaseQuantity);

router.delete("/:id/reset", tokenValidator, resetCart);

module.exports = router;
