const { success } = require("zod");

let errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ message: err.message || "internal server error", success: false });
    next();
}

module.exports = errorHandlerMiddleware;