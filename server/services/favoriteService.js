const {
  getFavoriteByUser,
  createFavorite,
  addProductToFavorites,
  removeProductFromFavorites,
} = require("../repositories/favoriteRepository");

const getMyFavoritesService = async (userId) => {
  return await getFavoriteByUser(userId);
};

const createFavoriteService = async (userId) => {
  return await createFavorite(userId);
};

const addProductToFavoritesService = async (userId, productId) => {
  return await addProductToFavorites(userId, productId);
};

const removeProductFromFavoritesService = async (userId, productId) => {
  return await removeProductFromFavorites(userId, productId);
};

module.exports = {
  getMyFavoritesService,
  createFavoriteService,
  addProductToFavoritesService,
  removeProductFromFavoritesService,
};
