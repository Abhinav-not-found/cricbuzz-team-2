const ScoreModel = require("../models/score.model");

class ScoreRepository {
	async create(data) {
		return ScoreModel.create(data);
	}

	async findAll(filters = {}) {
		return ScoreModel.find(filters)
			.populate("matchId")
			.populate("battingTeam")
			.populate("createdBy", "name email")
			.populate("updatedBy", "name email")
			.sort({ createdAt: -1 });
	}

	async findById(id) {
		return ScoreModel.findById(id)
			.populate("matchId")
			.populate("battingTeam")
			.populate("createdBy", "name email")
			.populate("updatedBy", "name email");
	}

	async update(id, data) {
		return ScoreModel.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async delete(id) {
		return ScoreModel.findByIdAndDelete(id);
	}
}

module.exports = ScoreRepository;
