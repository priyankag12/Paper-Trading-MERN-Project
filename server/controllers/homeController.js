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
            marketCache = {
                lastFetchTime: Date.now(),
                data
            };
        } catch (error) {
            console.error("Error fetching gainers and losers data:", error);
            return res.status(500).json({ error: "Failed to fetch market data." });
        }
    }

    if (marketCache.data) {
        const topGainers = marketCache.data.top_gainers.slice(0, 5);
        const topLosers = marketCache.data.top_losers.slice(0, 5);
        const mostActive = marketCache.data.most_actively_traded.slice(0, 5);

        res.json({
            top_gainers: topGainers,
            top_losers: topLosers,
            most_actively_traded: mostActive
        });
    } else {
        res.status(500).json({ error: "No market data available." });
    }
};

module.exports = { getNews, getTopGainersLosers };