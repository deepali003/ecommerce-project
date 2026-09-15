const express = require("express");
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();

// app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api", productRoutes);

// Error handling middleware
app.use(errorHandler);
module.exports = app;