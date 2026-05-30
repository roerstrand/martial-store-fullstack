import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart/me");
  return response.data;
};

export const addCartItem = async (cartId, productId, size) => {
  const response = await api.post(`/cart/${cartId}/products`, { product_id: productId, size });
  return response.data;
};

export const removeCartItem = async (cartId, productId) => {
  const response = await api.delete(`/cart/${cartId}/products/${productId}`);
  return response.data;
};

export const increaseQuantity = async (cartId, productId) => {
  const response = await api.patch(`/cart/${cartId}/products/${productId}/increase`);
  return response.data;
};

export const decreaseQuantity = async (cartId, productId) => {
  const response = await api.patch(`/cart/${cartId}/products/${productId}/decrease`);
  return response.data;
};

export const resetCart = async (cartId) => {
  const response = await api.delete(`/cart/${cartId}/reset`);
  return response.data;
};
