const { Router } = require("express");
const asyncHandler = require("../../shared/utils/asyncHandler");
const ScoreController = require("./score.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const scoreController = new ScoreController();

router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN));
router.post(
	"/",
	asyncHandler(scoreController.createScore.bind(scoreController)),
);
router.get(
	"/",
	asyncHandler(scoreController.getAllScores.bind(scoreController)),
);
router.get(
	"/:id",
	asyncHandler(scoreController.getScoreById.bind(scoreController)),
);
router.patch(
	"/:id",
	asyncHandler(scoreController.updateScore.bind(scoreController)),
);
router.delete(
	"/:id",
	asyncHandler(scoreController.deleteScore.bind(scoreController)),
);

module.exports = router;
