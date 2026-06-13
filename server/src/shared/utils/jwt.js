const env = require("../../config/env");
const jwt = require("jsonwebtoken");

const decodeAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET_ACCESS);
};

const decodeRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET_REFRESH);
};

module.exports = {
  decodeAccessToken,
  decodeRefreshToken,
};