const mongoose = require("mongoose");
const ApiError = require("../../shared/utils/ApiError");
const UserRepo = require("../../repository/user.repository");
const { hashPassword } = require("../../shared/utils/bcrypt");
const { ROLES } = require("../../constants/model.constant");

class UserService {
	constructor() {
		this.userRepo = new UserRepo();
	}

	async getAllUsers(query) {
		const filter = {
			isDeleted: false,
		};

		if (query.search) {
			const search = this.escapeRegex(query.search);
			filter.$or = [
				{ name: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
			];
		}

		const page = Number(query.page);
		const limit = Number(query.limit);

		if (page > 0 && limit > 0) {
			const skip = (page - 1) * limit;
			const [users, total] = await Promise.all([
				this.userRepo.findUsers(filter, { skip, limit }),
				this.userRepo.countUsers(filter),
			]);

			return {
				users,
				pagination: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit),
				},
			};
		}

		return this.userRepo.findUsers(filter);
	}

	async createUser(data = {}) {
		this.validateRequiredFields(data, ["name", "email", "password"]);
		this.validateEmail(data.email);

		const existingUser = await this.userRepo.findByEmail(data.email);
		if (existingUser) throw new ApiError(409, "User already exists");

		const allowedRoles = [ROLES.SCORER, ROLES.ADMIN];
		const role = data.role || ROLES.SCORER;
		if (!allowedRoles.includes(role)) {
			throw new ApiError(400, "Invalid role");
		}

		const hashedPassword = await hashPassword(data.password);

		const user = await this.userRepo.create({
			name: data.name,
			email: data.email,
			password: hashedPassword,
			role,
		});

		return this.sanitizeUser(user);
	}

	async updateUser(id, data = {}) {
		this.validateObjectId(id);

		const user = await this.userRepo.findById(id);
		if (!user || user.isDeleted) throw new ApiError(404, "User not found");

		const payload = {};

		if (data.name !== undefined) payload.name = data.name;

		if (data.email !== undefined) {
			this.validateEmail(data.email);

			const existingUser = await this.userRepo.findByEmail(data.email);
			if (existingUser && existingUser._id.toString() !== id) {
				throw new ApiError(409, "Email already exists");
			}

			payload.email = data.email;
		}

		if (!Object.keys(payload).length) {
			throw new ApiError(400, "No valid fields provided");
		}

		return this.userRepo.updateById(id, payload);
	}

	async softDeleteUser(id) {
		this.validateObjectId(id);

		const user = await this.userRepo.findById(id);
		if (!user || user.isDeleted) throw new ApiError(404, "User not found");

		return this.userRepo.updateById(id, { isDeleted: true });
	}

	async hardDeleteUser(id) {
		this.validateObjectId(id);

		const user = await this.userRepo.deleteById(id);
		if (!user) throw new ApiError(404, "User not found");

		return user;
	}

	async changeRole(id, data = {}) {
		this.validateObjectId(id);

		const allowedRoles = [ROLES.SCORER, ROLES.ADMIN];
		if (!allowedRoles.includes(data.role)) {
			throw new ApiError(400, "Invalid role");
		}

		const user = await this.userRepo.findById(id);
		if (!user || user.isDeleted) throw new ApiError(404, "User not found");

		if (user.role === data.role) {
			throw new ApiError(400, "User already has this role");
		}

		return this.userRepo.updateById(id, { role: data.role });
	}

	validateRequiredFields(data, fields) {
		fields.forEach((field) => {
			if (!data[field]) throw new ApiError(400, `${field} is required`);
		});
	}

	validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (typeof email !== "string" || !emailRegex.test(email)) {
			throw new ApiError(400, "Invalid email");
		}
	}

	validateObjectId(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new ApiError(400, "Invalid user id");
		}
	}

	escapeRegex(value) {
		return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	sanitizeUser(user) {
		const userObject = user.toObject();
		delete userObject.password;
		delete userObject.refreshToken;

		return userObject;
	}
}

module.exports = UserService;
