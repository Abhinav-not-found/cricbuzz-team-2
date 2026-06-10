const env = require("../../config/env");
const cookieOptions = {
	httpOnly: true,
	secure: env.NODE_ENV === "production",
	sameSite: env.NODE_ENV === "production" ? "none" : "lax",
};

const accessTokenOptions = {
	...cookieOptions,
	maxAge: 15 * 60 * 1000,
};

const refreshTokenOptions = {
	...cookieOptions,
	maxAge: 24 * 60 * 60 * 1000,
};

module.exports = {
	accessTokenOptions,
	refreshTokenOptions,
};
