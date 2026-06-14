const mongoose = require("mongoose");
const { ROLES } = require("../constants/model.constant");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			enum: Object.values(ROLES),
			default: ROLES.SCORER,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
