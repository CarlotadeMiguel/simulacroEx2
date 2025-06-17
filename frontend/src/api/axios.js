// src/api/axios.js
import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default client;
