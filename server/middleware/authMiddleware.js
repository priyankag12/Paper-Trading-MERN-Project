const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Log the token for debugging
    console.log("Received token:", token); // Add this line to log the token

    if (!token) {
        return res.status(401).json({ message: "Not authorized 1" });
    }

    try {
        console.log("Token before verification:", token); // Log the token before verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        
        // Log the user information after decoding
        console.log("Decoded user:", req.user); // Add this line to log the user info

        next();
    } catch (error) {
        console.error("Error verifying token:", error.message); // Log any errors during verification
        res.status(401).json({ message: "Not authorized 2" });
    }
};