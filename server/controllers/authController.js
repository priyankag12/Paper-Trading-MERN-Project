const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
var nodemailer = require("nodemailer");

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
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      age: user.age,
      balance: user.balance,
      avatar: user.avatar,
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
    user.avatar = req.body.avatar || user.avatar;

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
        age: user.age,
        avatar: user.avatar,
      },
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

//forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    console.log("Forgot was called");
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res
        .status(404)
        .json({ message: "Could not find a user with this email" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });

    const forgotLink = `http://localhost:3000/confirmpassword/${oldUser._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "paperlingosit@gmail.com",
        pass: "dula gowh kiku hiqi",
      },
    });

    var mailOptions = {
      from: "paperlingosit@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text:
        "This is the link to reset your password. If this was not you, please report!" +
        forgotLink,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(forgotLink);
  } catch (err) {
    console.log("Forgot Password failed with error: " + err);
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res
      .status(404)
      .json({ message: "Could not find a user with this email" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.json({ email: verify.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.confirmPassword = async (req, res) => {
  console.log("Request body:", req.body);
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res
      .status(404)
      .json({ message: "Could not find a user with this email" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    // const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.json("Password updated successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
