const ApiError = require("../utils/ApiError");

class NotFoundHandler {
    static handle(req, res, next) {
        next(new ApiError(404, `Route ${req.originalUrl} not found`));
    }
}

module.exports = NotFoundHandler