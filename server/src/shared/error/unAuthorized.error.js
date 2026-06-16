const ApiError = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

class UnAuthorizedHandler {
	static handle(_, __, next) {
		next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
	}
}

module.exports = UnAuthorizedHandler;
