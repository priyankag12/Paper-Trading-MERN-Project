export const getOHCLV = async (symbol) => {
    const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    return data;
};
