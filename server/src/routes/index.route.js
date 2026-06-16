const authRoutes = require("../modules/auth/auth.route");
const userRoutes = require("../modules/user/user.route");
const playerRoutes = require("../modules/player/player.route");
const teamRoutes = require("../modules/team/team.route");
const seriesRoutes = require("../modules/series/series.route");
const matchRoutes = require("../modules/match/match.route");
const commentaryRoutes = require("../modules/commentary/commentary.route");
const publicRoutes = require("../modules/public/public.route");
const scoreRoutes = require("../modules/score/score.route");
const { Router } = require("express");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/player", playerRoutes);
router.use("/team", teamRoutes);
router.use("/series", seriesRoutes);
router.use("/match", matchRoutes);
router.use("/commentary", commentaryRoutes);
router.use("/public", publicRoutes);
router.use("/score", scoreRoutes);

module.exports = router;
