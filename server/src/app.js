const express = require("express");
const ErrorHandlerMiddleware = require("./middleware/errorHandler.middleware");
const NotFoundHandler = require("./shared/error/notFound.error");
const passport = require("passport");
const morgan = require("morgan");
const env = require("./config/env");
const securityMiddleware = require("./middlewares/security.middleware");
const PassportConfig = require("./config/passport");
const authRoutes = require("./modules/auth/auth.route");

function createServer() {
	const app = express();

	app.use(NotFoundHandler.handle);
	app.use(ErrorHandlerMiddleware.handle);
	// Security middlewares
	securityMiddleware(app);

	// Passport
	PassportConfig.initialize();
	app.use(passport.initialize());

	// Logger
	if (env.NODE_ENV === "development") {
		app.use(morgan("dev"));
	}

	app.get("/", (_, res) => {
		res.send("CricBuzz backend is running");
	});
	app.use("/api/auth", authRoutes);

	return app;
}

module.exports = createServer;
