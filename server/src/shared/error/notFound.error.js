const ApiError = require("../utils/ApiError");

const handleNotFound = (req, res, next) => {
    next(new ApiError(404, `Route ${req.originalUrl} not found`));
}

module.exports = handleNotFound