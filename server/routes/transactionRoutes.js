const express = require("express");
const {
    getTransactionHistory,
    getStockBalance,
    addTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transaction-history", protect, getTransactionHistory);
router.get("/stock-balance", protect, getStockBalance);
router.put("/add-transaction", protect, addTransaction);


module.exports = router;
