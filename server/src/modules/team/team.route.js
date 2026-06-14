const { Router } = require("express");
const TeamController = require("./team.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const teamController = new TeamController();

router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN));

router.post("/", asyncHandler(teamController.createTeam.bind(teamController)));
router.get("/", asyncHandler(teamController.getTeams.bind(teamController)));
router.get("/:id", asyncHandler(teamController.getTeam.bind(teamController)));
router.patch(
	"/:id",
	asyncHandler(teamController.updateTeam.bind(teamController)),
);

router.delete(
	"/:id",
	asyncHandler(teamController.deleteTeam.bind(teamController)),
);

router.post(
	"/:id/players",
	asyncHandler(teamController.addPlayers.bind(teamController)),
);
router.delete(
	"/:id/players",
	asyncHandler(teamController.removePlayers.bind(teamController)),
);

module.exports = router;
