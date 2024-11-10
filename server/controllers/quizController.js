const User = require("../models/user.js");

exports.convertPoints = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { pointsToConvert } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found!" });

        user.points += pointsToConvert;
        const convertedCash = pointsToConvert * 100;
        user.balance += convertedCash;

        await user.save();
        res.status(200).json({
            balance: user.balance,
            message: "Points converted successfully!",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserQuizInfo = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const user = await User.findById(userId, { points: 1, balance: 1 });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ranking = await User.find({}, { _id: 1, username: 1, points: 1 })
            .sort({ points: -1 })
            .lean();
        const userRank =
            ranking.findIndex(
                (item) => item._id.toString() === userId.toString()
            ) + 1;
        res.status(200).json({
            points: user.points,
            balance: user.balance,
            userRank,
            message: "User quiz info retrieved successfully!",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const ranking = await User.find()
            .sort({ points: -1 })
            .select("username points");
        res.status(200).json({
            ranking,
            message: "Leader Board retrieved successfully!",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
