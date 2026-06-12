const express = require("express");
const env = require('./config/env')
const morgan = require('morgan');
const securityMiddleware = require("./middlewares/security.middleware");

function createServer() {
	const app = express();

	securityMiddleware(app)
	
	if(env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	return app;
}

module.exports = createServer;
