const createApp = require("./app");
const env = require("./config/env");
const connectDb = require("./database/database");
const logger = require("./config/logger");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { initSocket } = require("./socket/socket");

const app = createApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

initSocket(io);

function startServer() {
	connectDb()
		.then(() => {
			httpServer.listen(env.PORT, () => {
				logger.info(
					{ port: env.PORT },
					"\x1b[46mServer started on port:\x1b[0m",
				);
			});
		})
		.catch((e) => {
			logger.error({ error: e }, "Error while starting server", e);
		});
}

startServer();