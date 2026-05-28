import api from "./api";

export const getMyFavorites = async () => {
  const response = await api.get("/favorites/me");
  return response.data;
};

export const addProductToFavorites = async (productId) => {
  const response = await api.post(`/favorites/products/${productId}`);
  return response.data;
};

export const removeProductFromFavorites = async (productId) => {
  const response = await api.delete(`/favorites/products/${productId}`);
  return response.data;
};
