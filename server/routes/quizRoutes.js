const express = require('express');
const { convertPoints, getLeaderboard, getUserQuizInfo } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/convert-points', protect, convertPoints);
router.get('/get-points', protect, getUserQuizInfo);
router.get('/leaderboard', protect, getLeaderboard);
module.exports = router

