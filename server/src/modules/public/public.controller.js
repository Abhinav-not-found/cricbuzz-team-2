const httpStatus = require("http-status-codes");
const PublicService = require("./public.service");
const getIO = require("../../socket/socket");

class PublicController {
	constructor() {
		this.publicService = new PublicService();
	}

	async getSeriesList(req, res) {
		const data = await this.publicService.getSeriesList();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getSeriesById(req, res) {
		const data = await this.publicService.getSeriesById(req.params.seriesId);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getMatchesBySeriesId(req, res) {
		const { seriesId } = req.params;

		const matches = await this.publicService.findBySeriesId(seriesId);

		res.json({
			success: true,
			data: matches,
		});
	}

	async getMatches(req, res) {
		const data = await this.publicService.getMatches();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getLiveMatches(req, res) {
		const data = await this.publicService.getLiveMatches();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getUpcomingMatches(req, res) {
		const data = await this.publicService.getUpcomingMatches();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getRecentMatches(req, res) {
		const data = await this.publicService.getRecentMatches();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getMatchById(req, res) {
		const data = await this.publicService.getMatchById(req.params.matchId);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getTeams(req, res) {
		const data = await this.publicService.getTeams();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getTeamById(req, res) {
		const data = await this.publicService.getTeamById(req.params.teamId);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getPlayers(req, res) {
		const data = await this.publicService.getPlayers();

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getPlayerById(req, res) {
		const data = await this.publicService.getPlayerById(req.params.playerId);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data,
		});
	}

	async getMatchScore(req, res) {
		const { matchId } = req.params;

		const data = await this.publicService.getMatchScore(matchId);

		return res.status(200).json({
			success: true,
			data,
		});
	}

	async getMatchScorecard(req, res) {
		const { matchId } = req.params;

		const data = await this.publicService.getMatchScorecard(matchId);

		return res.status(200).json({
			success: true,
			data,
		});
	}

	async getMatchCommentary(req, res) {
		const { matchId } = req.params;

		const data = await this.publicService.getMatchCommentary(matchId);

		return res.status(200).json({
			success: true,
			data,
		});
	}
}

module.exports = PublicController;
