const AppError = require("../utils/AppError");

const validateProduct = (req, res, next) => {
  const { name, description, price, stock } = req.body;

  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Product name is required";
  }

  if (!description || description.trim() === "") {
    errors.description = "Product description is required";
  }

  if (price === undefined || price === null || price === "") {
    errors.price = "Price is required";
  } else if (isNaN(price)) {
    errors.price = "Price must be a number";
  } else if (Number(price) < 0) {
    errors.price = "Price cannot be negative";
  }

  if (stock === undefined || stock === null || stock === "") {
    errors.stock = "Stock is required";
  } else if (!Number.isInteger(Number(stock))) {
    errors.stock = "Stock must be an integer";
  } else if (Number(stock) < 0) {
    errors.stock = "Stock cannot be negative";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed", 400, errors));
  }

  next();
};

module.exports = validateProduct;
