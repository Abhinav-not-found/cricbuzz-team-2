const mongoose = require("mongoose");

const playerSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		image: String,
		role: {
			type: String,
			enum: ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"],
			required: true,
		},
		country: { type: String, required: true, trim: true },
		battingStyle: String,
		bowlingStyle: String,
		isDeleted: { type: Boolean, default: false },
		createdBy: { type: Schema.Types.ObjectId, ref: "User" },
		updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

const PlayerModel = mongoose.model("Player", playerSchema);

module.exports = PlayerModel;
