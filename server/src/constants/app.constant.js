const constants = {
	PORT: 8000,
	MONGO_URI: "mongodb://localhost:27017/crickbuzz",
	NODE_ENV: "development",
	LOGGER_LEVEL: "info",
	RATELIMIT_WINDOWMS: 15 * 60 * 1000,
	RATELIMIT: 1000,
};

const APP_CONFIG = {
	API_PREFIX: "/api",
};

module.exports = { constants, APP_CONFIG };
