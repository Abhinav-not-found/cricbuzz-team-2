const mongoose = require("mongoose");
const env = require("../config/env");
const logger = require("../config/logger");

const connectDb = async () => {
	await mongoose.connect(env.MONGO_URI);
	logger.info("\x1b[42mDatabase connected\x1b[0m");
};
module.exports = connectDb;
