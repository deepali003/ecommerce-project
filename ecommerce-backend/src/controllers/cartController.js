const cartService = require("../services/cartService");
const AppError = require("../utils/AppError");
const crypto = require("crypto");

const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity, mode = "set" } = req.body;
    let { sessionId } = req.body;
    // User must be either logged in or a guest with a session ID
    if (!userId && !sessionId) {
      // Generate session ID for new guest
      sessionId = crypto.randomUUID();
    }

    if (!productId) {
      throw new AppError("Product ID is required", 400);
    }

    if (!quantity) {
      throw new AppError("Quantity is required", 400);
    }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      throw new AppError("Quantity must be a positive integer", 400);
    }
    if (!["set", "increment"].includes(mode)) {
      throw new AppError("Mode must be either set or increment", 400);
    }

    const cartItem = await cartService.addToCart(
      userId || null,
      sessionId || null,
      productId,
      Number(quantity),
      mode,
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      sessionId: !userId ? sessionId : null,
      cartItem: cartItem,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = req.query;

    if (!userId && !sessionId) {
      throw new AppError("Either userId or sessionId is required", 400);
    }

    const cart = await cartService.getCart(userId || null, sessionId || null);

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: null,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
      items: cart.items,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { userId, sessionId, quantity } = req.body;
    const { id } = req.params;

    let cartSessionId = sessionId;

    // Generate guest session if required
    if (!userId && !cartSessionId) {
      throw new AppError("Session ID is required for guest cart", 400);
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new AppError("Invalid cart item ID", 400);
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      throw new AppError("Quantity must be a positive integer", 400);
    }

    const cartItem = await cartService.updateCartItem(
      userId || null,
      cartSessionId || null,
      Number(id),
      Number(quantity),
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = req.body;
    const { id } = req.params;

    if (!userId && !sessionId) {
      throw new AppError("Session ID is required for guest cart", 400);
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new AppError("Invalid cart item ID", 400);
    }

    const cartItem = await cartService.removeCartItem(
      userId || null,
      sessionId || null,
      Number(id),
    );

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
