const express = require("express");
const { register, login } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example of protected route
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        balance: req.user.balance,
        avatar: req.user.avatar,
    });
});

router.put("/profile", protect, async (req, res) => {
    try {
        // Update the user with the data sent in the request body
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { ...req.body }, // Spread the req.body to update only the provided fields
            { new: true, runValidators: true } // Ensure validators are run
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser, // Send the updated user back in the response
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete profile
router.delete("/profile", protect, async (req, res) => {
    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
