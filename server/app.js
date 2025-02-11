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

app.use(
    cors({
        origin: ["https://paper-lingo.vercel.app/", "http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);

app.options("*", cors()); // Handle preflight requests

// Ensure CORS headers are set in all responses
app.use((req, res, next) => {
    const allowedOrigins = [
        "https://paper-lingo.vercel.app/",
        "http://localhost:3000",
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

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
