const pool = require("../config/database");

const getAllProducts = async (limit = null) => {
  let query = 'SELECT * FROM products ORDER BY id DESC';
  const values = [];

  if (limit !== null) {
    query += " LIMIT $1";
    values.push(limit);
  }
  const result = await pool.query(query, values);
  return result.rows;
};

const createProducts = async (name, description, price, stock) => {
  const result = await pool.query(
    `INSERT INTO products
        (name, description, price, stock)
        VALUES ($1, $2, $3, $4)
        RETURNING * `,
    [name, description, price, stock],
  );

  return result.rows[0];
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const updateProduct = async (id, name, description, price, stock) => {
  const result = await pool.query(
    `UPDATE products
         SET name = $1,
            description = $2,
            price = $3,
            stock = $4
         WHERE id = $5
         RETURNING * `,
    [name, description, price, stock, id],
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    `DELETE FROM products
    WHERE id = $1
    RETURNING *`,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  createProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
