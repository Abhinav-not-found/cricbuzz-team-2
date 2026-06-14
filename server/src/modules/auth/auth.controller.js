const ApiResponse = require("../../shared/utils/ApiResponse");
const {
	accessTokenOptions,
	refreshTokenOptions,
} = require("../../shared/utils/cookie");
const AuthService = require("./auth.service");
const env = require("../../config/env");

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

		return res.redirect(`${env.CORS_ORIGIN}/admin?login=success`);
	}

	async refresh(req, res) {
		const { accessToken } = await this.authService.refresh(
			req.cookies.refreshToken,
		);
		res.cookie("accessToken", accessToken, accessTokenOptions);

		return ApiResponse(res, 200, "Access token generated");
	}

	async me(req, res) {
		const user = await this.authService.me(req.user?.id);
		return ApiResponse(res, 200, "User data fetched", user);
	}

	async logout(req, res) {
		await this.authService.logout(req.cookies.refreshToken);

		res.clearCookie("accessToken", accessTokenOptions);
		res.clearCookie("refreshToken", refreshTokenOptions);

		return ApiResponse(res, 200, "Logout successful");
	}
}

module.exports = AuthController;
