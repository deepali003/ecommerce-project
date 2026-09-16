const express = require("express");
const path = require("path");
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();

// app.use(cors());
app.use(express.json());
app.use(logger);

// Serve product images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

app.use("/api", productRoutes);

// Error handling middleware
app.use(errorHandler);
module.exports = app;