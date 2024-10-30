import apiClient from "../services/apiClient";

export const fetchNews = async () => {
  try {
    const response = await apiClient.get('/home/news');
    return response.data;
  } catch (error) {
    console.error("Error while fetching news: ", error);
    throw error;
  }
};

export const fetchGainersAndLosers = async () => {
  try {
      const response = await apiClient.get('/home/top-gainers-losers');
      return response.data;
  } catch (error) {
      console.error("Error fetching gainers and losers:", error);
      throw error;
  }
};