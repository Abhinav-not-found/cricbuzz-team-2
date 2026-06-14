const { Router } = require("express");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const PlayerController = require("./player.controller");

const router = Router();
const playerController = new PlayerController();

router.post(
	"/",
	AuthMiddleware.authenticate,
	roleMiddleware(["ADMIN"]),
	asyncHandler(playerController.createPlayer.bind(playerController)),
);

router.get(
	"/",
	AuthMiddleware.authenticate,
	roleMiddleware(["ADMIN"]),
	asyncHandler(playerController.getAllPlayers.bind(playerController)),
);

router.patch(
	"/:id",
	AuthMiddleware.authenticate,
	roleMiddleware(["ADMIN"]),
	asyncHandler(playerController.updatePlayer.bind(playerController)),
);

router.delete(
	"/:id",
	AuthMiddleware.authenticate,
	roleMiddleware(["ADMIN"]),
	asyncHandler(playerController.deletePlayer.bind(playerController)),
);

module.exports = router;
