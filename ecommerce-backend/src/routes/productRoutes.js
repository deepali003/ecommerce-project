const express = require("express");
const router = express.Router();
const validateProduct = require("../validators/productValidator");
const validateId = require("../middleware/validateId");
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);
router.get("/products/:id", validateId, productController.getProduct);
router.post("/products", validateProduct, productController.createProducts);
router.put("/products/:id", validateId, validateProduct, productController.updateProducts);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
