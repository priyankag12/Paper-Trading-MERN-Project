const express = require("express");
const { getTransactionHistory } = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transaction-history", protect, getTransactionHistory);

module.exports = router;