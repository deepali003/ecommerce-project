const pool = require("../config/database");
const AppError = require("../utils/AppError");

const getOrCreateCart = async (userId = null, sessionId = null) => {
  //Logged-in user
  if (userId) {
    const existingCart = await pool.query(
      `SELECT * FROM cart WHERE user_id = $1`,
      [userId],
    );

    if (existingCart.rows.length > 0) {
      return existingCart.rows[0];
    }

    const result = await pool.query(
      `INSERT INTO cart (user_id)
        VALUES ($1)
        RETURNING * `,
      [userId],
    );
    return result.rows[0];
  }

  // Guest user
  if (sessionId) {
    const existingCart = await pool.query(
      `SELECT *
       FROM cart
       WHERE session_id = $1`,
      [sessionId],
    );

    if (existingCart.rows.length > 0) {
      return existingCart.rows[0];
    }

    const result = await pool.query(
      `INSERT INTO cart (session_id)
       VALUES ($1)
       RETURNING *`,
      [sessionId],
    );

    return result.rows[0];
  }

  throw new Error("Either userId or sessionId is required");
};

const addToCart = async (
  userId,
  sessionId,
  productId,
  quantity,
  mode = "set",
) => {
  const cart = await getOrCreateCart(userId, sessionId);

  const product = await pool.query(
    `SELECT id, price, stock
     FROM products
     WHERE id = $1`,
    [productId],
  );

  if (product.rows.length === 0) {
    throw new AppError("Product not found", 404);
  }

  const productData = product.rows[0];

  if (productData.stock <= 0) {
    throw new AppError("Product is out of stock", 400);
  }

  const existingItem = await pool.query(
    `SELECT *
     FROM cart_items
     WHERE cart_id = $1
     AND product_id = $2`,
    [cart.id, productId],
  );

  if (existingItem.rows.length > 0) {
    let newQuantity;

    if (mode === "increment") {
      newQuantity = existingItem.rows[0].quantity + quantity;
    } else {
      newQuantity = quantity;
    }

    if (newQuantity > productData.stock) {
      throw new AppError(`Only ${productData.stock} items are available`, 400);
    }

    const result = await pool.query(
      `UPDATE cart_items
       SET quantity = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE cart_id = $2
       AND product_id = $3
       RETURNING *`,
      [newQuantity, cart.id, productId],
    );

    return result.rows[0];
  }

  if (quantity > productData.stock) {
    throw new AppError(`Only ${productData.stock} items are available`, 400);
  }

  const result = await pool.query(
    `INSERT INTO cart_items
      (cart_id, product_id, quantity, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [cart.id, productId, quantity, productData.price],
  );

  return result.rows[0];
};

const getCart = async (userId = null, sessionId = null) => {
  let cart;

  if (userId) {
    const result = await pool.query(
      `SELECT * FROM cart 
      WHERE user_id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    cart = result.rows[0];
  } else if (sessionId) {
    const result = await pool.query(
      `SELECT * FROM cart 
      WHERE session_id=$1`,
      [sessionId],
    );

    if (result.rows.length === 0) {
      return null;
    }

    cart = result.rows[0];
  } else {
    throw new Error("Either userId or sessionId is required");
  }

  // Get cart items with product details
  const items = await pool.query(
    `SELECT
       ci.id,
       ci.cart_id,
       ci.product_id,
       ci.quantity,
       ci.price,
       p.name,
       p.description,
       p.image
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = $1
     ORDER BY ci.id DESC`,
    [cart.id],
  );

  return {
    ...cart,
    items: items.rows,
  };
};

const updateCartItem = async (userId, sessionId, cartItemId, quantity) => {
  const cart = await getOrCreateCart(userId, sessionId);

  // Get cart item along with product stock
  const existingItem = await pool.query(
    `SELECT
       ci.id,
       ci.cart_id,
       ci.product_id,
       ci.quantity,
       p.stock
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.id = $1
     AND ci.cart_id = $2`,
    [cartItemId, cart.id],
  );

  if (existingItem.rows.length === 0) {
    throw new AppError("Cart item not found", 404);
  }

  const item = existingItem.rows[0];

  // Check stock
  if (quantity > item.stock) {
    throw new AppError(`Only ${item.stock} items are available`, 400);
  }

  const result = await pool.query(
    `UPDATE cart_items
     SET quantity = $1,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     AND cart_id = $3
     RETURNING *`,
    [quantity, cartItemId, cart.id],
  );

  return result.rows[0];
};

const removeCartItem = async (userId, sessionId, cartItemId) => {
  const cart = await getOrCreateCart(userId, sessionId);

  const result = await pool.query(
    `DELETE FROM cart_items
     WHERE id = $1
     AND cart_id = $2
     RETURNING *`,
    [cartItemId, cart.id],
  );

  if (result.rows.length === 0) {
    throw new AppError("Cart item not found", 404);
  }

  return result.rows[0];
};

module.exports = {
  getOrCreateCart,
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
