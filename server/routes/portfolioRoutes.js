const express = require('express');
const { getPortfolioData } = require('../controllers/portfolioController.js');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");

// Route to get portfolio data
router.get('/portfolio',protect, getPortfolioData);

module.exports = router;
