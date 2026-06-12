const createApp = require("./app");
const env = require("./config/env");
const connectDb = require("./database/database");
const logger = require('./config/logger')

const app = createApp();

function startServer() {
	connectDb()
		.then(() => {
			app.listen(env.PORT, () => {
				logger.info({ port: env.PORT },"\x1b[46mServer started on port:\x1b[0m");
			});
		})
		.catch((e) => {
			logger .error({ error:e },"Error while starting server", e);
		});
}

startServer();
