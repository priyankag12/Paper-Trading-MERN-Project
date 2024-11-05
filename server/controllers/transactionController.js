const Transaction = require("../models/transaction.js");
const User = require("../models/user.js");
const { format } = require("date-fns");

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            userId: req.user._id,
        }).sort({ dateTime: -1 });

        const formattedTransactions = transactions.map((transaction) => ({
            ...transaction._doc,
            dateTime: format(transaction.dateTime, "yyyy-MM-dd, HH:mm:ss"),
            pricePerShare: parseFloat(transaction.pricePerShare).toFixed(2),
            totalTransactionValue: parseFloat(transaction.totalTransactionValue).toFixed(2),
        }));

        res.status(200).json({ transactions: formattedTransactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getStockBalance = async (req, res) => {
    try {
        const { ticker } = req.query;

        if (!ticker) {
            return res.status(400).json({
                message: "No stock ticker provided",
            });
        }

        const transactions = await Transaction.find({
            userId: req.user._id,
            stockName: ticker,
        })
            .select("transactionType quantity")
            .lean();

        if (transactions.length === 0) {
            return res.status(200).json({
                message: `You do not own this stock`,
            });
        }

        let totalQuantity = 0;

        transactions.forEach((transaction) => {
            console.log(transaction.quantity);

            if (transaction.transactionType === "Buy") {
                totalQuantity += transaction.quantity;
            } else if (transaction.transactionType === "Sell") {
                totalQuantity -= transaction.quantity;
            }
        });

        return res.status(200).json({
            stock: ticker,
            totalQuantity,
        });
    } catch (error) {
        console.error("Error fetching stock summary:", error);
        return res.status(500).json({
            message: "Error fetching stock summary",
            error: error.message,
        });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { transactionType, quantity, pricePerShare } = req.body;

        const totalTransactionValue = quantity * pricePerShare;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (transactionType === "Buy") {
            if (user.balance < totalTransactionValue) {
                return res.status(400).json({
                    message: "Insufficient balance for this transaction",
                });
            }
            user.balance -= totalTransactionValue;
        } else if (transactionType === "Sell") {
            user.balance += totalTransactionValue;
        } else {
            return res
                .status(400)
                .json({ message: "Invalid transaction type" });
        }

        await user.save();

        const query = {
            userId: userId,
            ...req.body,
            totalTransactionValue: totalTransactionValue,
        };
        const transaction = await Transaction.create(query);

        res.status(200).json({ transaction, updatedBalance: user.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
