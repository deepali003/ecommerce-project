const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/cart/add", cartController.addToCart);
router.get("/cart", cartController.getCart);

router.put("/cart/item/:id", cartController.updateCartItem);
router.delete("/cart/item/:id", cartController.removeCartItem);

module.exports = router;