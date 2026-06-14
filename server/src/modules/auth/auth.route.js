const { Router } = require("express");
const AuthController = require("./auth.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const googleAuthMiddleware = require("../../middlewares/googleOAuth.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");

const router = Router();
const authController = new AuthController();

router.post(
	"/register",
	asyncHandler(authController.register.bind(authController)),
);
router.post("/login", asyncHandler(authController.login.bind(authController)));
router.post(
	"/refresh",
	asyncHandler(authController.refresh.bind(authController)),
);
router.get(
	"/me",
	AuthMiddleware.authenticate,
	asyncHandler(authController.me.bind(authController)),
);
router.post(
	"/logout",
	asyncHandler(authController.logout.bind(authController)),
);

router.get("/google", googleAuthMiddleware.redirectToGoogle());
router.get(
	"/google/callback",
	googleAuthMiddleware.handleGoogleCallback(),
	asyncHandler(authController.googleAuthSuccess.bind(authController)),
);

module.exports = router;
