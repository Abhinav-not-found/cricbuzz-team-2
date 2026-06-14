const { Router } = require("express");
const AuthController = require("./auth.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const googleAuthMiddleware = require("../../middlewares/googleOAuth.middleware");

const router = Router();
const authController = new AuthController();

router.post(
	"/register",
	asyncHandler(authController.register.bind(authController)),
);
router.post("/login", asyncHandler(authController.login.bind(authController)));
// me
// logout
// refresh

router.get("/google", googleAuthMiddleware.redirectToGoogle());
router.get(
	"/google/callback",
	googleAuthMiddleware.handleGoogleCallback(),
	asyncHandler(authController.googleAuthSuccess.bind(authController)),
);

module.exports = router;
