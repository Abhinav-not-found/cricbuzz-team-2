const MatchModel = require("./match.model");

class MatchRepository {
	async create(payload) {
		return MatchModel.create(payload);
	}

	async findById(id) {
		return MatchModel.findOne({
			_id: id,
			isDeleted: false,
		})
			.populate("seriesId")
			.populate("team1")
			.populate("team2")
			.populate("winner")
			.populate("tossWinner");
	}

	async findAll(filter = {}) {
		return MatchModel.find({
			isDeleted: false,
			...filter,
		})
			.populate("seriesId")
			.populate("team1")
			.populate("team2");
	}

	async update(id, payload) {
		return MatchModel.findByIdAndUpdate(id, payload, {
			new: true,
		});
	}
}

module.exports = MatchRepository;
