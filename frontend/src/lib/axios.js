import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });
api.interceptors.request.use((config) => {
  console.log("Axios request:", config.method, config.url);
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {}; // Ensure headers object exists
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response?.status, error.response?.data);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);
export default api;
