const AppError = require("../utils/AppError");

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return next(
            new AppError("Product ID must be a valid number", 400)
        );
    }

    next();
};

module.exports = validateId;