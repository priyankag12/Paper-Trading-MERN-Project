const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const portfolioRoutes = require("./routes/portfolioRoutes");
const homeRoutes = require("./routes/homeRoutes");
const quizRoutes = require("./routes/quizRoutes");

// Middleware
app.use(
    cors({
        origin: "*",
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);
app.use(express.json());

//using ejs engine to render the change password form
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/quiz", quizRoutes);

const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = app;
