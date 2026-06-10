module.exports = {
	PORT: 3000,
	MONGO_URI: "mongodb://localhost:27017/crickbuzz",
	NODE_ENV: "development",
	LOGGER_LEVEL: "info",
	RATELIMIT_WINDOWMS: 15 * 60 * 1000,
	RATELIMIT: 1000,
};
