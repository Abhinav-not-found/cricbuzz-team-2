const MatchModel = require("../../models/match.model");
const PublicRepository = require("../../repository/public.repository");

class PublicService {
	constructor() {
		this.publicRepository = new PublicRepository();
	}

	async getSeriesList() {
		return this.publicRepository.getSeriesList();
	}

	async getSeriesById(seriesId) {
		return this.publicRepository.getSeriesById(seriesId);
	}

	async findBySeriesId(seriesId) {
		return MatchModel.find({ seriesId })
			.sort({ createdAt: -1 })
			.limit(1)
			.populate("team1")
			.populate("team2");
	}

	async getMatches() {
		return this.publicRepository.getMatches();
	}

	async getLiveMatches() {
		return this.publicRepository.getLiveMatches();
	}

	async getUpcomingMatches() {
		return this.publicRepository.getUpcomingMatches();
	}

	async getRecentMatches() {
		return this.publicRepository.getRecentMatches();
	}

	async getMatchById(matchId) {
		return this.publicRepository.getMatchById(matchId);
	}

	async getTeams() {
		return this.publicRepository.getTeams();
	}

	async getTeamById(teamId) {
		return this.publicRepository.getTeamById(teamId);
	}

	async getPlayers() {
		return this.publicRepository.getPlayers();
	}

	async getPlayerById(playerId) {
		return this.publicRepository.getPlayerById(playerId);
	}
	async getMatchScore(matchId) {
		return this.publicRepository.getMatchScore(matchId);
	}

	async getMatchScorecard(matchId) {
		return this.publicRepository.getMatchScorecard(matchId);
	}

	async getMatchCommentary(matchId) {
		return this.publicRepository.getMatchCommentary(matchId);
	}
}

module.exports = PublicService;
