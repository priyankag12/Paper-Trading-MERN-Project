const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

const fetchNews = async () => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: "NEWS_SENTIMENT",
        sort: "LATEST",
        topics: "finance", 
        limit: 8,
        apikey: apiKey,
      }
    });
    return response.data.feed || [];
  } catch (error) {
    console.error("Error while getting news: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

const fetchGainersAndLosers = async () => {
  const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching gainers and losers:", error);
    throw new Error("Failed to fetch gainers and losers data");
  }
};

module.exports = { fetchNews, fetchGainersAndLosers };
