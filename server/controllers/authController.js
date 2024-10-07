const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Compare passwords
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error comparing passwords" });
            }

            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                // Send the token and user data
                return res.status(200).json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Register function
exports.register = async (req, res) => {
    const {
        name,
        age,
        role,
        batch,
        phone,
        emergencyContact,
        address,
        username,
        email,
        password,
    } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        user = new User({
            name,
            age,
            role,
            batch,
            phone,
            emergencyContact,
            address,
            username,
            email,
            password: hashedPassword, // Store hashed password
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Send token and user data (excluding password)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
