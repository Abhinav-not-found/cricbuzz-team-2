const ApiError = require("../shared/utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const roleMiddleware = (roles) => {
	return (req, _, next) => {
		if (roles.includes(req.user.role)) {
			return next();
		}

		next(new ApiError(StatusCodes.FORBIDDEN, "Forbidden"));
	};
};

module.exports = roleMiddleware;
