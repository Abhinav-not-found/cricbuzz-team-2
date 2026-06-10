const mongoose = require("mongoose");
const env = require("../config/env");

const connectDb = async() => {
	await mongoose.connect(env.MONGODB_URI);
	console.log("\x1b[42mDatabase connected\x1b[0m");
};
module.exports = connectDb;
