require("dotenv").config(); 
const mongoose = require("mongoose");
const Transaction = require("./models/transaction"); 
const User = require("./models/user"); 


async function createTransaction() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findOne({ email: "riya@gmail.com" });
        if (!user) {
            console.error("User not found");
            return;
        }

        const quantity = 5;
        const pricePerShare = 4422;
        const totalTransactionValue = quantity * pricePerShare; 

        const newTransaction = new Transaction({
            userId: user._id,
            stockName: "Google Inc.",
            transactionType: "Sell",
            quantity: quantity,
            pricePerShare: pricePerShare,
            totalTransactionValue: totalTransactionValue, 
        });

        await newTransaction.save();
        console.log("Transaction saved:", newTransaction);

    } catch (err) {
        console.error("Error saving transaction:", err);
    } finally {
        mongoose.connection.close();
    }
}

createTransaction();