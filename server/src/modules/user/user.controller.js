const ApiResponse = require("../../shared/utils/ApiResponse");
const UserService = require("./user.service");

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async getAllUsers(req, res) {
		const result = await this.userService.getAllUsers(req.query);
		return ApiResponse(res, 200, "Users fetched successfully", result);
	}

	async createUser(req, res) {
		const user = await this.userService.createUser(req.body);
		return ApiResponse(res, 201, "User created successfully", user);
	}

	async updateUser(req, res) {
		const user = await this.userService.updateUser(req.params.id, req.body);
		return ApiResponse(res, 200, "User updated successfully", user);
	}

	async softDeleteUser(req, res) {
		const user = await this.userService.softDeleteUser(req.params.id);
		return ApiResponse(res, 200, "User soft deleted successfully", user);
	}

	async hardDeleteUser(req, res) {
		await this.userService.hardDeleteUser(req.params.id);
		return ApiResponse(res, 200, "User deleted successfully");
	}

	async changeRole(req, res) {
		const user = await this.userService.changeRole(req.params.id, req.body);
		return ApiResponse(res, 200, "User role updated successfully", user);
	}
}

module.exports = UserController;
