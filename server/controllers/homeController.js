const { fetchNews, fetchGainersAndLosers } = require('../service/homeService');

const CACHE_EXPIRY_ONE_HOUR = 60 * 60 * 1000;
const CACHE_EXPIRY_ONE_DAY = 24 * 60 * 60 * 1000;

let newsCache = {
    lastFetchTime: null,
    articles: []
};
let marketCache = {
    lastFetchTime: null,
    data: null
};

const isCacheExpired = (lastFetchTime, expiryTime) => {
    const currentTime = Date.now();
    return (
        !lastFetchTime ||
        (currentTime - lastFetchTime > expiryTime) ||
        new Date(currentTime).getDate() !== new Date(lastFetchTime).getDate()
    );
};

const getNews = async (req, res) => {
    if (!newsCache.articles.length || isCacheExpired(newsCache.lastFetchTime, CACHE_EXPIRY_ONE_HOUR)) {
        try {
            const articles = await fetchNews();
            newsCache = {
                lastFetchTime: Date.now(),
                articles: articles.slice(0, 6)
            };
        } catch (error) {
            console.error("Error fetching news:", error);
            return res.status(500).json({ error: "Failed to fetch news articles." });
        }
    }
    res.json(newsCache.articles);
};

const getTopGainersLosers = async (req, res) => {
    if (!marketCache.data || isCacheExpired(marketCache.lastFetchTime, CACHE_EXPIRY_ONE_DAY)) {
        try {
            const data = await fetchGainersAndLosers();
            if (!data || !data.top_gainers || !data.top_losers || !data.most_actively_traded) {
                throw new Error("Incomplete data structure from API");
            }
            marketCache = {
                lastFetchTime: Date.now(),
                data
            };
        } catch (error) {
            console.error("Error fetching gainers and losers data:", error);
            return res.status(500).json({ error: "Failed to fetch market data." });
        }
    }

    res.json({
        top_gainers: marketCache.data.top_gainers.slice(0, 5),
        top_losers: marketCache.data.top_losers.slice(0, 5),
        most_actively_traded: marketCache.data.most_actively_traded.slice(0, 5),
    });
};

module.exports = { getNews, getTopGainersLosers };