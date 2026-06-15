const CommentaryRepository = require("../../repository/commentary.repository");

class CommentaryService {
	constructor() {
		this.commentaryRepository = new CommentaryRepository();
	}

	async createCommentary(payload) {
		return this.commentaryRepository.create(payload);
	}

	async getAllCommentaries(matchId) {
		const filters = {};

		if (matchId) {
			filters.matchId = matchId;
		}

		return this.commentaryRepository.findAll(filters);
	}

	async getCommentaryById(id) {
		const commentary = await this.commentaryRepository.findById(id);

		if (!commentary) {
			throw new Error("Commentary not found");
		}

		return commentary;
	}

	async updateCommentary(id, payload) {
		const commentary = await this.commentaryRepository.update(id, payload);

		if (!commentary) {
			throw new Error("Commentary not found");
		}

		return commentary;
	}

	async deleteCommentary(id) {
		const commentary = await this.commentaryRepository.delete(id);

		if (!commentary) {
			throw new Error("Commentary not found");
		}

		return commentary;
	}
}

module.exports = CommentaryService;
