const TeamModel = require("../models/team.model");

class TeamRepository {
	async create(payload) {
		return TeamModel.create(payload);
	}

	async findById(id) {
		return TeamModel.findOne({
			_id: id,
			isDeleted: false,
		});
	}

	async findByName(name) {
		return TeamModel.findOne({
			name,
			isDeleted: false,
		});
	}

	async findAll(filter = {}) {
		return TeamModel.find({
			isDeleted: false,
			...filter,
		}).populate("squadPlayers");
	}

	async update(id, payload) {
		return TeamModel.findByIdAndUpdate(id, payload, {
			new: true,
		}).populate();
	}
}

module.exports = TeamRepository;
