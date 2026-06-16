const ScoreModel = require("../../models/score.model");
const ScoreRepository = require("../../repository/score.repository");
const MatchModel = require("../../models/match.model");

class ScoreService {
	constructor() {
		this.scoreRepository = new ScoreRepository();
	}

	async createScore(payload) {
		return this.scoreRepository.create(payload);
	}

	async getAllScores(filters) {
		return this.scoreRepository.findAll(filters);
	}

	async getScoreById(id) {
		const score = await this.scoreRepository.findById(id);

		if (!score) {
			throw new Error("Score not found");
		}

		return score;
	}

	async updateByMatchId(matchId, payload) {
		let score = await ScoreModel.findOne({ matchId });

		if (!score) {
			const match = await MatchModel.findById(matchId);

			if (!match) throw new Error("Match not found");

			score = await ScoreModel.create({
				matchId,
				innings: payload.innings || 1,
				battingTeam: match.team1, // default assumption
				score: payload.score || 0,
				wickets: payload.wickets || 0,
			});
		}

		score.score = payload.score;
		score.wickets = payload.wickets;

		await score.save();

		return score;
	}

	async deleteScore(id) {
		const score = await this.scoreRepository.delete(id);

		if (!score) {
			throw new Error("Score not found");
		}

		return score;
	}
}

module.exports = ScoreService;
