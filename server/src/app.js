const express = require("express");
const ErrorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const NotFoundHandler = require("./shared/error/notFound.error");
const passport = require("passport");
const morgan = require("morgan");
const env = require("./config/env");
const securityMiddleware = require("./middlewares/security.middleware");
const PassportConfig = require("./config/passport");
const routes = require("./routes/index.route");
const { APP_CONFIG } = require("./constants/app.constant");

function registerMiddlewares(app) {
	securityMiddleware(app);

	PassportConfig.initialize();
	app.use(passport.initialize());

	if (env.NODE_ENV === "development") {
		app.use(morgan("dev"));
	}
}

function registerRoutes(app) {
	app.get("/", (_, res) => {
		res.send("CricBuzz backend is running");
	});

	app.use(APP_CONFIG.API_PREFIX, routes);
}

function registerErrorHandlers(app) {
	app.use(NotFoundHandler.handle);
	app.use(ErrorHandlerMiddleware.handle);
}

function createServer() {
	const app = express();

	registerMiddlewares(app);
	registerRoutes(app);
	registerErrorHandlers(app);

	return app;
}

module.exports = createServer;
