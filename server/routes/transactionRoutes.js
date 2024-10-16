const express = require("express");
const {
    getTransactionHistory,
    getStockBalance,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transaction-history", protect, getTransactionHistory);
router.get("/stock-balance", protect, getStockBalance);

module.exports = router;
