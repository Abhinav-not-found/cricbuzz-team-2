const SeriesModel = require("../models/series.model");

class SeriesRepository {
	async create(payload) {
		return SeriesModel.create(payload);
	}

	async findById(id) {
		return SeriesModel.findOne({
			_id: id,
			isDeleted: false,
		});
	}

	async findByName(name) {
		return SeriesModel.findOne({
			name,
			isDeleted: false,
		});
	}

	async findAll(filter = {}) {
		return SeriesModel.find({
			isDeleted: false,
			...filter,
		});
	}

	async update(id, payload) {
		return SeriesModel.findByIdAndUpdate(id, payload, {
			new: true,
		});
	}
}

module.exports = SeriesRepository;
