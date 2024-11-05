const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (isMatch) {
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        // Send the token and user data
        return res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            username: user.username,
            avatar: user.avatar,
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
    return res.status(500).json({ message: error });
  }
};

// Register function
exports.register = async (req, res) => {
  const { name, age, username, email, password } = req.body;

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
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      age: user.age,
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user details!" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.age = req.body.age || user.age;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        age: user.age
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Error updating user details!" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ message: "Error deleting user!" });
  }
};