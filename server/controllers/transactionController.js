const Transaction = require("../models/transaction.js");

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};