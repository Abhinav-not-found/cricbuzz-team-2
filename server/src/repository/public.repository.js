const Match = require("../models/match.model");
const Series = require("../models/series.model");
const Team = require("../models/team.model");
const Player = require("../models/player.model");
const Commentary = require("../models/commentary.model");
const { MATCH_STATUS } = require("../constants/model.constant");

class PublicRepository {
	async getSeriesList() {
		return Series.find().sort({ createdAt: -1 });
	}

	async getSeriesById(seriesId) {
		return Series.findById(seriesId).populate("matches");
	}

	async getMatches() {
		return Match.find()
			.populate("teamA")
			.populate("teamB")
			.sort({ matchDate: -1 });
	}

	async getLiveMatches() {
		return Match.find({
			status: MATCH_STATUS.LIVE,
		})
			.populate("teamA")
			.populate("teamB");
	}

	async getUpcomingMatches() {
		return Match.find({
			status: MATCH_STATUS.UPCOMING,
		})
			.populate("teamA")
			.populate("teamB");
	}

	async getRecentMatches() {
		return Match.find({
			status: MATCH_STATUS.COMPLETED,
		})
			.populate("teamA")
			.populate("teamB")
			.sort({ updatedAt: -1 });
	}

	async getMatchById(matchId) {
		return Match.findById(matchId)
			.populate("teamA")
			.populate("teamB")
			.populate("playing11.player");
	}

	async getTeams() {
		return Team.find();
	}

	async getTeamById(teamId) {
		return Team.findById(teamId).populate("players");
	}

	async getPlayers() {
		return Player.find();
	}

	async getPlayerById(playerId) {
		return Player.findById(playerId);
	}

	async getMatchScore(matchId) {
		return Match.findById(matchId)
			.select("status teamA teamB score currentInnings")
			.populate("teamA")
			.populate("teamB");
	}
	async getMatchScorecard(matchId) {
		return Match.findById(matchId)
			.populate("teamA")
			.populate("teamB")
			.populate("playing11.player");
	}

	async getMatchCommentary(matchId) {
		return Commentary.find({
			match: matchId,
		})
			.sort({ createdAt: -1 })
			.populate("player");
			
	}
}

module.exports = PublicRepository;
