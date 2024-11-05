const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const portfolioRoutes = require('./routes/portfolioRoutes');

// Middleware
app.use(
    cors({
        origin: true,
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", transactionRoutes);
app.use("/api/portfolio", portfolioRoutes);


const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = app;