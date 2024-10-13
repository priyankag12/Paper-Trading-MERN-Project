const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stockName: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["buy", "sell"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerShare: {
        type: Number,
        required: true,
    },
    totalTransactionValue: {
        type: Number,
        required: true,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

module.exports = mongoose.model("Transaction", transactionSchema);