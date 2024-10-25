import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchNews = async () => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: "NEWS_SENTIMENT",
        sort: "LATEST",
        limit: "8",
        apikey: apiKey,
      }
    });
    
    console.log(response.data);
    return response.data.feed || []; 
  } catch (error) {
    console.error("Error while fetching news: ", error);
    throw error;
  }
}