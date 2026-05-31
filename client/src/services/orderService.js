import api from "./api";

export const createOrder = async (products, totalPrice) => {
  const response = await api.post("/orders", { products, totalPrice });
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.post("/orders/me");
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.post(`/orders/${orderId}`);
  return response.data;
};
