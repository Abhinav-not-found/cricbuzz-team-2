const express = require("express");
const env = require("./config/env");
const morgan = require("morgan");
const securityMiddleware = require("./middlewares/security.middleware");
const passport = require("passport");

const PassportConfig = require("./config/passport");
const googleAuthRouter = require("./modules/auth/google/google.route");

function createServer() {
  const app = express();

  securityMiddleware(app);
  
  PassportConfig.initialize();
  app.use(passport.initialize());
  
  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use("/api/auth", googleAuthRouter);

  return app;
}

module.exports = createServer;