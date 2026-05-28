const {
  getFavoriteListByUser,
  createFavoriteList,
  addProductToFavorites,
  removeProductFromFavorites,
} = require("../repositories/favoriteRepository");

const getMyFavoriteListService = async (userId) => {
  return await getFavoriteListByUser(userId);
};

const createFavoriteListService = async (userId) => {
  return await createFavoriteList(userId);
};

const addProductToFavoritesService = async (userId, productId) => {
  return await addProductToFavorites(userId, productId);
};

const removeProductFromFavoritesService = async (userId, productId) => {
  return await removeProductFromFavorites(userId, productId);
};

module.exports = {
  getMyFavoriteListService,
  createFavoriteListService,
  addProductToFavoritesService,
  removeProductFromFavoritesService,
};
