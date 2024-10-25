const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    transactionId: {
        type: String,
        unique: true,
    },
    stockName: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["Buy", "Sell"],
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
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

transactionSchema.pre('save', async function (next) {
    let unique = false;
    while (!unique) {
        const shortTimestamp = Date.now().toString().slice(-6);
        const randomString = generateRandomString(4);
        this.transactionId = `TXN${shortTimestamp}${randomString}`;

        const existingTransaction = await mongoose.model("Transaction").findOne({ transactionId: this.transactionId });
        unique = !existingTransaction;
    }

    next();
});

module.exports = mongoose.model("Transaction", transactionSchema);