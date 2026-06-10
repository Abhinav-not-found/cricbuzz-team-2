const createApp = require("./app");
const env = require("./config/env");
const connectDb = require("./database/database");

const app = createApp();

function startServer() {
	connectDb()
		.then(() => {
			app.listen(env.PORT, () => {
				console.log("\x1b[46mServer started on port:\x1b[0m", env.PORT);
			});
		})
		.catch((e) => {
			console.log("Error while starting server", e);
		});
}

startServer();
