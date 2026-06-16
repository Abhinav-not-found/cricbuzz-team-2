const httpStatus = require("http-status-codes");
const ScoreService = require("./score.service");
const { getIO } = require("../../socket/socket");

class ScoreController {
	constructor() {
		this.scoreService = new ScoreService();
	}

	async createScore(req, res) {
		const score = await this.scoreService.createScore({
			...req.body,
			createdBy: req.user._id,
			updatedBy: req.user._id,
		});

		return res.status(httpStatus.StatusCodes.CREATED).json({
			success: true,
			data: score,
		});
	}

	async getAllScores(req, res) {
		const filters = {};

		if (req.query.matchId) {
			filters.matchId = req.query.matchId;
		}

		if (req.query.innings) {
			filters.innings = req.query.innings;
		}

		const scores = await this.scoreService.getAllScores(filters);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data: scores,
		});
	}

	async getScoreById(req, res) {
		const score = await this.scoreService.getScoreById(req.params.id);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data: score,
		});
	}

	async updateScoreByMatchId(req, res) {
		const { matchId } = req.params;

		const score = await this.scoreService.updateByMatchId(matchId, req.body);

		const io = getIO();
		io.emit("score:update", {
			matchId,
			data: score,
		});

		res.json({
			success: true,
			data: score,
		});
	}

	async deleteScore(req, res) {
		await this.scoreService.deleteScore(req.params.id);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			message: "Score deleted successfully",
		});
	}
}

module.exports = ScoreController;
