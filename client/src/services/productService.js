import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async () => {
  const response = await api.post("/products");
  return response.data;
};

export const updateProduct = async (id) => {
  const response = await api.put(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const reponse = await api.get(`/products/${id}`);
  return response.data;
};
