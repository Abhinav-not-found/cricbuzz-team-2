const ApiError = require("../shared/utils/ApiError");
const { decodeAccessToken } = require("../shared/utils/jwt");
const UserRepo = require("../repository/user.repository");
const { StatusCodes } = require("http-status-codes");

class AuthMiddleware {
	static async authenticate(req, _, next) {
		try {
			const token = req.cookies?.accessToken;
			if (!token)
				throw new ApiError(StatusCodes.UNAUTHORIZED, "No token provided");

			const decoded = decodeAccessToken(token);

			req.user = {
				id: decoded.id,
				role: decoded.role,
			};

			next();
		} catch (error) {
			next(
				error instanceof ApiError
					? error
					: new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"),
			);
		}
	}

	static authorize(...roles) {
		return async (req, _, next) => {
			try {
				const userRepo = new UserRepo();
				const user = await userRepo.findById(req.user?.id);

				if (!user || user.isDeleted)
					throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
				if (!roles.includes(user.role))
					throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden");

				req.user = {
					id: user._id,
					role: user.role,
				};

				next();
			} catch (error) {
				next(
					error instanceof ApiError
						? error
						: new ApiError(StatusCodes.FORBIDDEN, "Forbidden"),
				);
			}
		};
	}
}

module.exports = AuthMiddleware;
