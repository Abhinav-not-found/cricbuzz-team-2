const CommentaryModel = require("../models/commentary.model");

class CommentaryRepository {
	async create(data) {
		return CommentaryModel.create(data);
	}

	async findAll(filters = {}) {
		return CommentaryModel.find(filters)
			.populate("createdBy", "name email")
			.populate("updatedBy", "name email")
			.sort({ createdAt: -1 });
	}

	async findById(id) {
		return CommentaryModel.findById(id)
			.populate("createdBy", "name email")
			.populate("updatedBy", "name email");
	}

	async update(id, data) {
		return CommentaryModel.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async delete(id) {
		return CommentaryModel.findByIdAndDelete(id);
	}
}

module.exports = CommentaryRepository;
