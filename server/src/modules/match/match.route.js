const { Router } = require("express");
const MatchController = require("./match.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const matchController = new MatchController();

// Require authentication for all routes
router.use(AuthMiddleware.authenticate);

// All authenticated users can fetch matches
router.get("/", asyncHandler(matchController.getMatches.bind(matchController)));
router.get(
	"/:id",
	asyncHandler(matchController.getMatch.bind(matchController)),
);

// Admin-only endpoints for creating, updating, deleting matches
router.use(AuthMiddleware.authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.post(
	"/",
	asyncHandler(matchController.createMatch.bind(matchController)),
);
router.patch(
	"/:id",
	asyncHandler(matchController.updateMatch.bind(matchController)),
);
router.delete(
	"/:id",
	asyncHandler(matchController.deleteMatch.bind(matchController)),
);
router.patch(
	"/:id/playing-xi",
	asyncHandler(matchController.updatePlayingXI.bind(matchController)),
);
router.patch(
	"/:id/toss",
	asyncHandler(matchController.updateToss.bind(matchController)),
);
router.patch(
	"/:id/result",
	asyncHandler(matchController.updateResult.bind(matchController)),
);
router.patch(
	"/:id/status",
	asyncHandler(matchController.updateStatus.bind(matchController)),
);

module.exports = router;
