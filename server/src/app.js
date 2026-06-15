const express = require("express");
const ErrorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const NotFoundHandler = require("./shared/error/notFound.error");
const passport = require("passport");
const morgan = require("morgan");
const env = require("./config/env");
const securityMiddleware = require("./middlewares/security.middleware");
const PassportConfig = require("./config/passport");
const authRoutes = require("./modules/auth/auth.route");
const userRoutes = require("./modules/user/user.route");
const playerRoutes = require("./modules/player/player.route");
const teamRoute = require("./modules/team/team.route");
const seriesRoute = require("./modules/series/series.route");
const matchRoute = require("./modules/match/match.route");
const commentaryRoute = require("./modules/commentary/commentary.route");
const publicRoute = require("./modules/public/public.route");

function createServer() {
	const app = express();

	securityMiddleware(app);

	PassportConfig.initialize();
	app.use(passport.initialize());

	if (env.NODE_ENV === "development") {
		app.use(morgan("dev"));
	}

	app.get("/", (_, res) => {
		res.send("CricBuzz backend is running");
	});
	app.use("/api/auth", authRoutes);
	app.use("/api/users", userRoutes);
	app.use("/api/player", playerRoutes);
	app.use("/api/team", teamRoute);
	app.use("/api/series", seriesRoute);
	app.use("/api/match", matchRoute);
	app.use("/api/commentary", commentaryRoute);
	app.use("/api/public", publicRoute);

	app.use(NotFoundHandler.handle);
	app.use(ErrorHandlerMiddleware.handle);

	return app;
}

module.exports = createServer;
