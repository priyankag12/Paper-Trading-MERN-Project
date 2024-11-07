const Transaction = require("../models/transaction");
const axios = require("axios");
const { getStockBalance } = require("./transactionController");

// Controller function to get portfolio data
const getPortfolioData = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId }); // Fetch transactions for the user

        const portfolio = {};

        // Process each transaction to calculate portfolio summary
        for (const transaction of transactions) {
            const { stockName, quantity, pricePerShare, transactionType } =
                transaction;

            if (!portfolio[stockName]) {
                portfolio[stockName] = {
                    stockName,
                    totalQuantity: 0,
                    totalInvested: 0,
                    avgPurchasePrice: 0,
                    gainLossPercentage: 0,
                    currentStockPrice: 0,
                    totalPortfolioValue: 0,
                };
            }

            if (transactionType === "Buy") {
                portfolio[stockName].totalQuantity += quantity;
                portfolio[stockName].totalInvested += pricePerShare * quantity;
                portfolio[stockName].avgPurchasePrice = parseFloat(
                    (
                        portfolio[stockName].totalInvested /
                        portfolio[stockName].totalQuantity
                    ).toFixed(2)
                );
            } else if (transactionType === "Sell") {
                // Ensure quantity doesn't go negative
                if (portfolio[stockName].totalQuantity >= quantity) {
                    portfolio[stockName].totalQuantity -= quantity;
                    portfolio[stockName].totalInvested -=
                        portfolio[stockName].avgPurchasePrice * quantity;
                } else {
                    console.warn(
                        `Warning: Sell quantity exceeds available quantity for ${stockName}`
                    );
                    portfolio[stockName].totalQuantity = 0;
                    portfolio[stockName].totalInvested = 0;
                }
            }
        }

        // Calculate gain/loss percentage and portfolio value for each stock
        for (const stockName in portfolio) {
            const currentStockPrice = await getCurrentStockPrice(stockName);
            portfolio[stockName].currentStockPrice = parseFloat(
                (currentStockPrice || 0).toFixed(2)
            );

            if (portfolio[stockName].totalQuantity > 0) {
                portfolio[stockName].gainLossPercentage = parseFloat(
                    (
                        ((currentStockPrice -
                            portfolio[stockName].avgPurchasePrice) /
                            portfolio[stockName].avgPurchasePrice) *
                        100
                    ).toFixed(2)
                );
                portfolio[stockName].totalPortfolioValue = parseFloat(
                    (
                        portfolio[stockName].totalQuantity * currentStockPrice
                    ).toFixed(2)
                );
            } else {
                // Stock sold out, set gain/loss and portfolio value to 0
                portfolio[stockName].gainLossPercentage = 0;
                portfolio[stockName].totalPortfolioValue = 0;
            }
        }

        res.status(200).json(Object.values(portfolio)); // Send portfolio data as an array
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
};

// Function to fetch the current stock price from Alpha Vantage
async function getCurrentStockPrice(stockName) {
    try {
        const apiKey = process.env.API_KEY; // Replace with your API key
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=5min&apikey=${apiKey}`;

        const response = await axios.get(url);
        const timeSeries = response.data["Time Series (5min)"];
        console.log(response);

        if (timeSeries) {
            const latestTime = Object.keys(timeSeries)[0];
            const latestPrice = parseFloat(timeSeries[latestTime]["4. close"]);
            return latestPrice;
        } else {
            throw new Error(`No data available for stock: ${stockName}`);
        }
    } catch (error) {
        console.error(
            `Error fetching stock price for ${stockName}:`,
            error.message
        );
        return null; // Return null or a default price in case of an error
    }
}

module.exports = { getPortfolioData };
