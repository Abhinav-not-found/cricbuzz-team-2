const jwt = require("jsonwebtoken");
const env = require("../../config/env");

const generateAccessToken = (userId) => {
	return jwt.sign({ id: userId }, env.JWT_SECRET_ACCESS, {
		expiresIn: "15m",
	});
};
const generateRefreshToken = (userId) => {
	return jwt.sign({ id: userId }, env.JWT_SECRET_REFRESH, {
		expiresIn: "1d",
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
};
