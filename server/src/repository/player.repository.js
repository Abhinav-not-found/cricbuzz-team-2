const PlayerModel = require("../models/player.model");

class PlayerRepository {
	async create(data) {
		return PlayerModel.create(data);
	}

	async findAll() {
		return PlayerModel.find({ isDeleted: false })
			.populate("createdBy", "name email")
			.populate("updatedBy", "name email");
	}

	async findById(id) {
		return PlayerModel.findOne({
			_id: id,
			isDeleted: false,
		});
	}

	async update(id, data) {
		return PlayerModel.findByIdAndUpdate(id, data, {
			new: true,
		});
	}

	async softDelete(id, updatedBy) {
		return PlayerModel.findByIdAndUpdate(
			id,
			{
				isDeleted: true,
				updatedBy,
			},
			{ new: true },
		);
	}
}

module.exports = PlayerRepository;
