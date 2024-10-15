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


    if (!token) {
        return res.status(401).json({ message: "Not authorized 1" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");



        next();
    } catch (error) {
        console.error("Error verifying token:", error.message); // Log any errors during verification
        res.status(401).json({ message: "Not authorized 2" });
    }
};
