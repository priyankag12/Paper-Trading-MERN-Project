const express = require('express');
const { getNews, getTopGainersLosers } = require('../controllers/homeController');
const router = express.Router();

router.get("/news", getNews);
router.get("/top-gainers-losers", getTopGainersLosers);

module.exports = router;