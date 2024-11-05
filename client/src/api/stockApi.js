import apiClient from "../services/apiClient";

export const getStockDetails = async (symbol) => {
    try {
        const response = await apiClient.get(
            `/transaction/stock-balance?ticker=${symbol}`
        );
        console.log("Get stock details data: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching stock details:", error);
        throw error;
    }
};

export const getUserBalance = async () => {
    try {
        const response = await apiClient.get("/auth/profile");
        console.log("Get user balance data: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching user balance:", error);
        throw error;
    }
};
