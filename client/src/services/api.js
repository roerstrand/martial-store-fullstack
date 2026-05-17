import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3000/api",
});

api.inteceptors.request.use((config) => {
  const token = localstorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
