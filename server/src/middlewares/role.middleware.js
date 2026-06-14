const ApiError = require("../shared/utils/ApiError");

const roleMiddleware = (roles) => {
	return (req, _, next) => {
    console.log(req.user)
		if (roles.includes(req.user.role)) {
			return next();
		}

		next(new ApiError(403, "Forbidden"));
	};
};

module.exports = roleMiddleware;
