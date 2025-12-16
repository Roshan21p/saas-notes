import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,   // Set the base URL
    withCredentials: true,    // Allow cookies to be sent with requests
})

export default apiClient;