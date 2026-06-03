import api from "./api";

export const adminGetAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const adminUpdateOrderStatus = async (id, status) => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return res.data;
};

export const adminDeleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

export const adminGetAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const adminCreateProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const adminUpdateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const adminDeleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
