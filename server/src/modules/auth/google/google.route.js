const { Router } = require("express");
const googleAuthMiddleware = require("../../../middlewares/googleOAuth.middleware");
const googleAuthController = require("./google.controller");
const asyncHandler = require("../../../shared/utils/asyncHandler");

const router = Router();

router.get("/google", googleAuthMiddleware.redirectToGoogle());

router.get(
  "/google/callback",
  googleAuthMiddleware.handleGoogleCallback(),
  asyncHandler(googleAuthController.googleAuthSuccess)
);

module.exports = router;