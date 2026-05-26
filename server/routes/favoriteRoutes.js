const express = require("express");
const tokenValidator = require("../middleware/validateTokenHandler");
const {
  getMyFavorites,
  createFavorite,
  addProductToFavorites,
  removeProductFromFavorites,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/me", tokenValidator, getMyFavorites);
router.post("/", tokenValidator, createFavorite);
router.post("/products/:productId", tokenValidator, addProductToFavorites);
router.delete("/products/:productId", tokenValidator, removeProductFromFavorites);

module.exports = router;
