const jwt = require("jsonwebtoken");
const env = require("../../config/env");

const generateAccessToken = (userId, role) => {
	console.log("role=>", role);
	return jwt.sign({ id: userId, role: role }, env.JWT_SECRET_ACCESS, {
		expiresIn: "15m",
	});
};
const generateRefreshToken = (userId, role) => {
	return jwt.sign({ id: userId, role: role }, env.JWT_SECRET_REFRESH, {
		expiresIn: "1d",
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
};
