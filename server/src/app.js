const express = require("express");
const errorHandlerMiddleware = require("./middleware/errorHandler.middleware");

function createServer() {
	const app = express();

	app.use(errorHandlerMiddleware);
	return app;
}

module.exports = createServer;
