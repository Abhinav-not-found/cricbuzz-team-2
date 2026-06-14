const ApiError = require("../shared/utils/ApiError");
const { decodeAccessToken } = require("../shared/utils/jwt");

class AuthMiddleware {
	static async authenticate(req, _, next) {
		try {
			const token = req.cookies?.accessToken;
			if (!token) throw new ApiError(401, "No token provided");

			const decoded = decodeAccessToken(token);

			req.user = {
				id: decoded.id,
			};

			next();
		} catch (error) {
			next(
				error instanceof ApiError ? error : new ApiError(401, "Unauthorized"),
			);
		}
	}
}

module.exports = AuthMiddleware;
