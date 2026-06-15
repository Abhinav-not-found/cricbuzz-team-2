const { Router } = require("express");
const MatchController = require("./match.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const matchController = new MatchController();

router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN));

router.post(
	"/",
	asyncHandler(matchController.createMatch.bind(matchController)),
);
router.get("/", asyncHandler(matchController.getMatches.bind(matchController)));
router.get(
	"/:id",
	asyncHandler(matchController.getMatch.bind(matchController)),
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
