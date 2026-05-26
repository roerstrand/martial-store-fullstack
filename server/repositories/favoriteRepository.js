const Favorite = require("../models/favoriteModel");

const getFavoriteByUser = async (userId) => {
  return await Favorite.findOne({ user_id: userId }).populate("products");
};

const createFavorite = async (userId) => {
  return await Favorite.create({ user_id: userId, products: [] });
};

const addProductToFavorites = async (userId, productId) => {
  return await Favorite.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { products: productId } },
    { new: true }
  ).populate("products");
};

const removeProductFromFavorites = async (userId, productId) => {
  return await Favorite.findOneAndUpdate(
    { user_id: userId },
    { $pull: { products: productId } },
    { new: true }
  ).populate("products");
};

module.exports = {
  getFavoriteByUser,
  createFavorite,
  addProductToFavorites,
  removeProductFromFavorites,
};
