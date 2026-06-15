const logger = require("../config/logger");

let ioInstance = null;

function initSocket(io) {
	ioInstance = io;
	io.on("connection", (socket) => {
		logger.info("a user connected");

		socket.emit("connected", { message: "message changed" });
	});
}

function getIO() {
	if (!ioInstance) throw new Error("Socket not initialized");
	return ioInstance;
}

module.exports = { initSocket, getIO };
