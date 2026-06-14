const ApiError = require("../../shared/utils/ApiError");
const UserRepo = require("../../repository/user.repository");
const { hashPassword } = require("../../shared/utils/bcrypt");
const bcrypt = require("bcryptjs");
const { decodeRefreshToken } = require("../../shared/utils/jwt");

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
		if (existingUser) throw new ApiError(409, "User already exists");

		const hashedPassword = await hashPassword(data.password);

		const user = await this.userRepo.create({
			...data,
			password: hashedPassword,
			role: "SCORER",
		});

		const accessToken = generateAccessToken(user._id);
		const refreshToken = generateRefreshToken(user._id);

		user.refreshToken = refreshToken;
		await user.save();

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	async login(data) {
		const { email, password } = data;

		const user = await this.userRepo.findByEmail(email);
		if (!user) throw new ApiError(404, "User not found");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new ApiError(401, "Invalid credentials");

		const accessToken = generateAccessToken(user._id);
		const refreshToken = generateRefreshToken(user._id);

		user.refreshToken = refreshToken;
		await user.save();

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	async googleLogin(user) {
		if (!user) throw new ApiError(401, "Google authentication failed");

		const accessToken = generateAccessToken(user._id);
		const refreshToken = generateRefreshToken(user._id);

		user.refreshToken = refreshToken;
		await user.save();

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw new ApiError(400, "UnAuthorized user");

		const decode = decodeRefreshToken(refreshToken);

		const user = await this.userRepo.findById(decode.id);
		if (!user) throw new ApiError(401, "UnAuthorized user");

		if (refreshToken !== user.refreshToken) {
			throw new ApiError(401, "Unauthorized user");
		}

		const accessToken = generateAccessToken(user._id);
		return {
			accessToken,
		};
	}

	async me(userId) {
		const user = await this.userRepo.fetchMe(userId);

		if (!user) throw new ApiError(404, "User not found");

		return user;
	}

	async logout(refreshToken) {
		if (!refreshToken) return;

		const decode = decodeRefreshToken(refreshToken);

		const user = await this.userRepo.findById(decode.id);
		if (!user) throw new ApiError(400, "User not found");

		user.refreshToken = null;
		await user.save();
	}
}

module.exports = AuthService;
