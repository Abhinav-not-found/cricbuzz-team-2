const mongoose = require("mongoose");
const { MATCH_STATUS } = require("../constants/model.constant.js");

const playingPlayerSchema = new mongoose.Schema(
	{
		player: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
			required: true,
		},
		isCaptain: { type: Boolean, default: false },
		isWicketKeeper: { type: Boolean, default: false },
	},
	{ _id: false },
);

const matchSchema = new mongoose.Schema(
	{
		seriesId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Series",
			required: true,
		},
		matchNumber: String,
		venue: { type: String, required: true, trim: true },
		startTime: { type: Date, required: true },
		status: {
			type: String,
			enum: Object.values(MATCH_STATUS),
			default: MATCH_STATUS.UPCOMING,
		},
		team1: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Team",
			required: true,
		},
		team2: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Team",
			required: true,
		},
		tossWinner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
		tossDecision: { type: String, enum: ["BAT", "BOWL"] },
		playingXI: {
			team1: [playingPlayerSchema],
			team2: [playingPlayerSchema],
		},
		winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
		result: String,
		isDeleted: { type: Boolean, default: false },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

matchSchema.index({ status: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ seriesId: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team1: 1, startTime: -1, isDeleted: 1 });
matchSchema.index({ team2: 1, startTime: -1, isDeleted: 1 });

const MatchModel = mongoose.model("Match", matchSchema);

module.exports = MatchModel;
