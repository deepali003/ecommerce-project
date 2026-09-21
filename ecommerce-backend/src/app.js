const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// app.use(cors());
app.use(
    cors({
        origin: "http://localhost:3000"
    })
);
app.use(express.json());
app.use(logger);

// Serve product images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);


app.use("/api", productRoutes);
app.use("/api", cartRoutes);

// Error handling middleware
app.use(errorHandler);
module.exports = app;