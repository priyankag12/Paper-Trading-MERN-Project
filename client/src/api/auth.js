import apiClient from "../services/apiClient";

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post("/auth/register", userData);
        console.log(token);
        const { token, user } = response.data;
        return { token, user };
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const loginUser = async (data) => {
    try {
        const response = await apiClient.post("/auth/login", data);
        const { token, user } = response.data;
        console.log(token);
        return { token, user };
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

// Get user profile (protected route)
export const getProfile = async () => {
    return await apiClient.get("/profile");
};
