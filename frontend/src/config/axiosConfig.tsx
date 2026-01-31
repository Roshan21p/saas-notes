import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,   // Set the base URL
    withCredentials: true,    // Allow cookies to be sent with requests
})

console.log("API Client Base URL:", apiClient.defaults.baseURL);
// Attach token before every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default apiClient;