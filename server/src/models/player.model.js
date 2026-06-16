const mongoose = require("mongoose");
const PLAYER_ROLES = require("../constants/player.constant");

const playerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		image: String,
		role: {
			type: String,
			enum: PLAYER_ROLES,
			required: true,
		},
		country: { type: String, required: true, trim: true },
		battingStyle: String,
		bowlingStyle: String,
		isDeleted: { type: Boolean, default: false },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

const PlayerModel = mongoose.model("Player", playerSchema);

module.exports = PlayerModel;
