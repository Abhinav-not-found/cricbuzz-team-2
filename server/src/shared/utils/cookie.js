const env = require("../../config/env");
const COOKIE_CONFIG = require("../../constants/cookie.constant");

const cookieOptions = {
	httpOnly: true,
	secure: env.NODE_ENV === "production",
	sameSite: env.NODE_ENV === "production" ? "none" : "lax",
};

const accessTokenOptions = {
	...cookieOptions,
	maxAge: COOKIE_CONFIG.accessTokenMaxAge,
};

const refreshTokenOptions = {
	...cookieOptions,
	maxAge: COOKIE_CONFIG.refreshTokenMaxAge,
};

module.exports = {
	accessTokenOptions,
	refreshTokenOptions,
};
