const express = require("express");
const errorHandlerMiddleware = require("./middleware/errorHandler.middleware");
const handleNotFound = require("./shared/error/notFound.error");

function createServer() {
	const app = express();

	app.use(handleNotFound);
	app.use(errorHandlerMiddleware);
	return app;
}

module.exports = createServer;
