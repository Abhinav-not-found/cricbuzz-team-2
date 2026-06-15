const ScoreRepository = require("../../repository/score.repository");

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

	async updateScore(id, payload) {
		const score = await this.scoreRepository.update(id, payload);

		if (!score) {
			throw new Error("Score not found");
		}

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
