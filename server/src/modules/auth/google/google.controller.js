const ApiError = require("../../../shared/utils/ApiError");
const ApiResponse = require("../../../shared/utils/ApiResponse");
const { generateAccessToken, generateRefreshToken } = require("../../../shared/utils/token");
const { accessTokenOptions, refreshTokenOptions } = require("../../../shared/utils/cookie");

class GoogleAuthController {
  async googleAuthSuccess(req, res) {
    if (!req.user) {
      throw new ApiError(401, "Google authentication failed");
    }

    const user = req.user;

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json(
        new ApiResponse(
          200,
          "Logged in successfully with Google",
          { user, accessToken, refreshToken }
        )
      );
  }
}

module.exports = new GoogleAuthController();