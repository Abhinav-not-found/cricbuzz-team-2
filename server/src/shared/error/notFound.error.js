const ApiError = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

class NotFoundHandler {
	static handle(req, _, next) {
		next(
			new ApiError(StatusCodes.NOT_FOUND, `Route ${req.originalUrl} not found`),
		);
	}
}

module.exports = NotFoundHandler;
