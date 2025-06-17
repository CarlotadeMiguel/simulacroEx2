//src/api/axios.js
import axios from "axios";

// Creamos una instancia de Axios con baseURL relativa para aprovechar el proxy de Vite
const client = axios.create({
  baseURL: "/api", // El proxy de Vite se encarga de redirigir a http://localhost:5000/api
  withCredentials: false, // Cambia a true si necesitas cookies
});

// Opcional: Interceptor para devolver solo los datos útiles de la respuesta
client.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default client;
