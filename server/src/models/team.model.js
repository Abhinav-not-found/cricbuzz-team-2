const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		shortName: { type: String, required: true, trim: true, unique: true },
		logo: { type: String, required: true },
		primaryColor: String,
		squadPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
		isDeleted: { type: Boolean, default: false },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

const TeamModel = mongoose.model("Team", teamSchema);

module.exports = TeamModel;
