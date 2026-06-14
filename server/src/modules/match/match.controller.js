const MatchService = require("./match.service");

class MatchController {
	constructor() {
		this.matchService = new MatchService();
	}

	async createMatch(req, res) {
		const data = await this.matchService.createMatch(req.body, req.user._id);

		res.status(201).json({
			success: true,
			data,
		});
	}

	async getMatches(_, res) {
		const data = await this.matchService.getMatches();

		res.json({
			success: true,
			data,
		});
	}

	async getMatch(req, res) {
		const data = await this.matchService.getMatch(req.params.id);

		res.json({
			success: true,
			data,
		});
	}

	async updateMatch(req, res) {
		const data = await this.matchService.updateMatch(
			req.params.id,
			req.body,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async deleteMatch(req, res) {
		await this.matchService.deleteMatch(req.params.id, req.user._id);

		res.json({
			success: true,
			message: "Match deleted successfully",
		});
	}

	async updatePlayingXI(req, res) {
		const data = await this.matchService.updatePlayingXI(
			req.params.id,
			req.body.playingXI,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async updateToss(req, res) {
		const data = await this.matchService.updateToss(
			req.params.id,
			req.body,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async updateResult(req, res) {
		const data = await this.matchService.updateResult(
			req.params.id,
			req.body,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async updateStatus(req, res) {
		const data = await this.matchService.updateStatus(
			req.params.id,
			req.body.status,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}
}

module.exports = MatchController;
