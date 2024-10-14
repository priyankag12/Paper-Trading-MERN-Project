import axios from "axios";
import { getToken } from "../auth";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            console.log("Attaching token:", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response.status === 401) {
            // REDIRECT TO LOGIN
        }
        return Promise.reject(error);
    }
);

export default apiClient;
