const express = require("express");

const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

// Start server
app.listen("8000", () => {
    console.log("Backend is ON!");
});

module.exports = app;
