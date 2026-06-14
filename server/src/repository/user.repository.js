const UserModel = require("../models/user.model");

class UserRepo {
	async create(payload) {
		return UserModel.create(payload);
	}

	async findByEmail(email) {
		return UserModel.findOne({ email });
	}

	async findById(id) {
		return UserModel.findById(id);
	}

	async findUsers(filter, options = {}) {
		const query = UserModel.find(filter).select("-password -refreshToken");

		if (options.skip !== undefined) query.skip(options.skip);
		if (options.limit !== undefined) query.limit(options.limit);

		return query.sort({ createdAt: -1 });
	}

	async countUsers(filter) {
		return UserModel.countDocuments(filter);
	}

	async fetchMe(id) {
		return UserModel.findById(id).select("-password -refreshToken");
	}

	async findAll() {
		return UserModel.find();
	}

	async updateById(id, payload) {
		return UserModel.findByIdAndUpdate(id, payload, {
			new: true,
			runValidators: true,
		}).select("-password -refreshToken");
	}

	async deleteById(id) {
		return UserModel.findByIdAndDelete(id);
	}
}

module.exports = UserRepo;
