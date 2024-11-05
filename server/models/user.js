const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "Please enter your age"],
    },
    avatar: {
        type: String,
        public_id: String,
        url: String,
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    balance: {
        type: Number,
        required: [true, "Balance  not specified"],
        default: 10000,
    },
    points: {
        type: Number,
        default: 0, 
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
});

module.exports = mongoose.model("User", userSchema);
