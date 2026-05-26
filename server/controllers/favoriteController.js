const asyncHandler = require("express-async-handler");
const {
  getMyFavoritesService,
  createFavoriteService,
  addProductToFavoritesService,
  removeProductFromFavoritesService,
} = require("../services/favoriteService");

// @desc    GET favorites for current user
// @route   GET /api/favorites/me
// @access  private
const getMyFavorites = asyncHandler(async (req, res) => {
  const favorites = await getMyFavoritesService(req.user.id);
  if (!favorites) {
    res.status(404);
    throw new Error("No favorites found for current user");
  }
  res.status(200).json(favorites);
});

// @desc    Create favorites list for current user
// @route   POST /api/favorites
// @access  private
const createFavorite = asyncHandler(async (req, res) => {
  const existing = await getMyFavoritesService(req.user.id);
  if (existing) {
    res.status(400);
    throw new Error("Favorites list already exists");
  }
  const favorites = await createFavoriteService(req.user.id);
  res.status(201).json(favorites);
});

// @desc    Add product to favorites
// @route   POST /api/favorites/products/:productId
// @access  private
const addProductToFavorites = asyncHandler(async (req, res) => {
  const favorites = await addProductToFavoritesService(req.user.id, req.params.productId);
  if (!favorites) {
    res.status(404);
    throw new Error("Favorites list not found");
  }
  res.status(200).json(favorites);
});

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/products/:productId
// @access  private
const removeProductFromFavorites = asyncHandler(async (req, res) => {
  const favorites = await removeProductFromFavoritesService(req.user.id, req.params.productId);
  if (!favorites) {
    res.status(404);
    throw new Error("Favorites list not found");
  }
  res.status(200).json(favorites);
});

module.exports = {
  getMyFavorites,
  createFavorite,
  addProductToFavorites,
  removeProductFromFavorites,
};
