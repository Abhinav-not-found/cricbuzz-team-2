const dotenv = require("dotenv");
const z = require("zod");
const { constants } = require("../constants/app.constant");

dotenv.config({ quiet: true });

const envSchema = z.object({
	PORT: z.coerce.number().default(constants.PORT),
	MONGODB_URI: z.string().default(constants.MONGO_URI),
	JWT_SECRET_ACCESS: z.string(),
	JWT_SECRET_REFRESH: z.string(),
	NODE_ENV: z.string(),
	LOGGER_LEVEL: z.string().default(constants.LOGGER_LEVEL),
	CORS_ORIGIN: z.string(),
	RATELIMIT_WINDOWMS: z.coerce.number().default(constants.RATELIMIT_WINDOWMS),
	RATELIMIT: z.coerce.number().default(constants.RATELIMIT),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_CALLBACK_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	throw new Error("Check your Env");
}

module.exports = parsed.data;
