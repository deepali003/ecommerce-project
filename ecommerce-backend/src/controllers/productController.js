const productService = require("../services/productService");
const AppError = require("../utils/AppError");

const getAllProducts = async (req, res, next) => {
  try {
    // throw new Error("Testing server error");
    const products = await productService.getAllProducts();
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createProducts = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await productService.createProducts(
      name,
      description,
      price,
      stock,
    );
    res.status(201).json({
      success: true,
      message: "Product created sucessfully",
      product: product,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }
    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const product = await productService.updateProduct(
      id,
      name,
      description,
      price,
      stock,
    );
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProducts,
  getProduct,
  updateProducts,
  deleteProduct,
};
