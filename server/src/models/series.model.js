const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		shortName: { type: String, required: true, trim: true },
		season: { type: String, required: true, trim: true, unique: true },
		status: {
			type: String,
			enum: ["UPCOMING", "LIVE", "COMPLETED"],
			default: "UPCOMING",
		},
		logo: { type: String, default: "" },
		isDeleted: { type: Boolean, default: false },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

const SeriesModel = mongoose.model("Series", seriesSchema);

module.exports = SeriesModel;
