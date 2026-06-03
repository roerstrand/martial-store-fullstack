import api from "./api";

export const createOrder = async (products, totalPrice, shippingMethod, carrier) => {
  const response = await api.post("/orders", { products, totalPrice, shippingMethod, carrier });
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/me");
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
