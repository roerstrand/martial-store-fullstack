const express = require("express");
const tokenValidator = require("../middleware/validateTokenHandler");
const {
  getMyFavoriteList,
  createFavoriteList,
  addProductToFavorites,
  removeProductFromFavorites,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/me", tokenValidator, getMyFavoriteList);
router.post("/", tokenValidator, createFavoriteList);
router.post("/products/:productId", tokenValidator, addProductToFavorites);
router.delete("/products/:productId", tokenValidator, removeProductFromFavorites);

module.exports = router;
