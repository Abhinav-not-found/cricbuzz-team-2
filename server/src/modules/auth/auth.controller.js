const ApiResponse = require("../../shared/utils/ApiResponse");
const {
	accessTokenOptions,
	refreshTokenOptions,
} = require("../../shared/utils/cookie");
const AuthService = require("./auth.service");

class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	async register(req, res) {
		const result = await this.authService.register(req.body);

		res.cookie("accessToken", result.accessToken, accessTokenOptions);

		res.cookie("refreshToken", result.refreshToken, refreshTokenOptions);

		return ApiResponse(res, 201, "Register successful", result.user);
	}

	async login(req, res) {
		const result = await this.authService.login(req.body);

		res.cookie("accessToken", result.accessToken, accessTokenOptions);

		res.cookie("refreshToken", result.refreshToken, refreshTokenOptions);

		return ApiResponse(res, 200, "Login successful", result.user);
	}

	async googleAuthSuccess(req, res) {
		const result = await this.authService.googleLogin(req.user);

		res.cookie("accessToken", result.accessToken, accessTokenOptions);

		res.cookie("refreshToken", result.refreshToken, refreshTokenOptions);

		return ApiResponse(res, 200, "Google login successful", result.user);
	}
}

module.exports = AuthController;
