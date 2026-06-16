const logger = require("../config/logger");
const { StatusCodes } = require("http-status-codes");

class ErrorHandlerMiddleware {
	static handle(err, _, res, __) {
		logger.error(
			{
				message: err.message,
				stack: err.stack,
				statusCode: err.statusCode,
			},
			"Unhandled application error",
		);
		return res
			.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				message: err.message || "internal server error",
				success: false,
			});
	}
}

module.exports = ErrorHandlerMiddleware;
