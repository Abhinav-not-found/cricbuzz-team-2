const express = require("express");
const ErrorHandlerMiddleware = require("./middleware/errorHandler.middleware");
const NotFoundHandler = require("./shared/error/notFound.error");

function createServer() {
	const app = express();

	app.use(NotFoundHandler.handle);
	app.use(ErrorHandlerMiddleware.handle);
	return app;
}

module.exports = createServer;
