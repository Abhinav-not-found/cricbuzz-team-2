const constants = {
	PORT: 8000,
	MONGO_URI: "mongodb://localhost:27017/crickbuzz",
	NODE_ENV: "development",
	LOGGER_LEVEL: "info",
	RATELIMIT_WINDOWMS: 15 * 60 * 1000,
	RATELIMIT: 1000,
};

app_config = {
	jwt: {
		refreshToken: {
			expiresIn: "30D",
		},
		accessToken: {
			expiresIn: "1H",
		},
	},
	cookie: {
		accessToken: {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 60 * 60 * 1000,
		},
		refreshToken: {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		},
	},
};

const PLAYER_ROLES = ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"];

module.exports = { constants, app_config, PLAYER_ROLES };
