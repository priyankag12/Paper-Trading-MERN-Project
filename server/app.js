const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = app;
