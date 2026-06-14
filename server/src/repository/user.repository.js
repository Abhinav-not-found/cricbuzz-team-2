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

	async findAll() {
		return UserModel.find();
	}
}

module.exports = UserRepo
