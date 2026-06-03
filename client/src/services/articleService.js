import api from "./api";

export const getArticles = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await api.get(`/articles${query ? `?${query}` : ""}`);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};
