const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const JWT_CONFIG = require("../../constants/auth.constant");

const generateAccessToken = (userId, role) => {
	return jwt.sign(
		{ id: userId, role: role },
		env.JWT_SECRET_ACCESS,
		JWT_CONFIG.refreshTokenExpire,
	);
};
const generateRefreshToken = (userId, role) => {
	return jwt.sign(
		{ id: userId, role: role },
		env.JWT_SECRET_REFRESH,
		JWT_CONFIG.refreshTokenExpire,
	);
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
};
