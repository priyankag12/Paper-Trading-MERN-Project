import apiClient from "../services/apiClient";

export const getTransactions = async () => {
  try {
    const response = await apiClient.get('/transaction/transaction-history');
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data?.message || error.message);
    throw error;
  }
};