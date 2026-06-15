const { Router } = require("express");
const asyncHandler = require("../../shared/utils/asyncHandler");
const PublicController = require("./public.controller");

const router = Router();
const publicController = new PublicController();

router.get(
	"/series",
	asyncHandler(publicController.getSeriesList.bind(publicController)),
);

router.get(
	"/series/:seriesId",
	asyncHandler(publicController.getSeriesById.bind(publicController)),
);

router.get(
	"/matches",
	asyncHandler(publicController.getMatches.bind(publicController)),
);

router.get(
	"/matches/live",
	asyncHandler(publicController.getLiveMatches.bind(publicController)),
);

router.get(
	"/matches/upcoming",
	asyncHandler(publicController.getUpcomingMatches.bind(publicController)),
);

router.get(
	"/matches/recent",
	asyncHandler(publicController.getRecentMatches.bind(publicController)),
);

router.get(
	"/matches/:matchId",
	asyncHandler(publicController.getMatchById.bind(publicController)),
);

router.get(
	"/teams",
	asyncHandler(publicController.getTeams.bind(publicController)),
);

router.get(
	"/teams/:teamId",
	asyncHandler(publicController.getTeamById.bind(publicController)),
);

router.get(
	"/players",
	asyncHandler(publicController.getPlayers.bind(publicController)),
);

router.get(
	"/players/:playerId",
	asyncHandler(publicController.getPlayerById.bind(publicController)),
);

router.get(
	"/matches/:matchId/score",
	asyncHandler(publicController.getMatchScore.bind(publicController)),
);

router.get(
	"/matches/:matchId/scorecard",
	asyncHandler(publicController.getMatchScorecard.bind(publicController)),
);

router.get(
	"/matches/:matchId/commentary",
	asyncHandler(publicController.getMatchCommentary.bind(publicController)),
);

module.exports = router;
