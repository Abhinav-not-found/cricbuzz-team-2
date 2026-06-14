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

	async fetchMe(id) {
		return UserModel.findById(id).select("-password -refreshToken");
	}

	async findAll() {
		return UserModel.find();
	}
}

module.exports = UserRepo;
