const ApiError = require("../../shared/utils/ApiError");
const UserRepo = require("../../repository/user.repository");
const { hashPassword } = require("../../shared/utils/bcrypt");
const bcrypt = require("bcryptjs");

const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../shared/utils/token");

class AuthService {
	constructor() {
		this.userRepo = new UserRepo();
	}

	async register(data) {
		const existingUser = await this.userRepo.findByEmail(data.email);

		if (existingUser) {
			throw new ApiError(409, "User already exists");
		}

		const hashedPassword = await hashPassword(data.password);

		const user = await this.userRepo.create({
			...data,
			password: hashedPassword,
			role: "SCORER",
		});

		return this.generateAuthResponse(user);
	}

	async login(data) {
		const { email, password } = data;

		const user = await this.userRepo.findByEmail(email);

		if (!user) {
			throw new ApiError(404, "User not found");
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new ApiError(401, "Invalid credentials");
		}

		return this.generateAuthResponse(user);
	}

	async googleLogin(user) {
		if (!user) {
			throw new ApiError(401, "Google authentication failed");
		}

		const accessToken = generateAccessToken(user._id);
		const refreshToken = generateRefreshToken(user._id);

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	generateAuthResponse(user) {
		return {
			user,
			accessToken: generateAccessToken(user._id),
			refreshToken: generateRefreshToken(user._id),
		};
	}
}

module.exports = AuthService;
