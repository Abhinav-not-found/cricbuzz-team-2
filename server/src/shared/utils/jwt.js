const env = require("../../config/env");
const jwt = require("jsonwebtoken");

const decodeRefreshToken = (token) => {
	return jwt.verify(token, env.JWT_SECRET_ACCESS);
};

const decodeAccessToken = (token) => {
	return jwt.verify(token, env.JWT_SECRET_REFRESH);
};

module.exports = {
	decodeAccessToken,
	decodeRefreshToken,
};
