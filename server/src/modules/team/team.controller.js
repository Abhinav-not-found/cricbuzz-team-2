const TeamService = require("./team.service");

class TeamController {
	constructor() {
		this.teamService = new TeamService();
	}

	async createTeam(req, res) {
		const data = await this.teamService.createTeam(req.body, req.user.id);

		res.status(201).json({
			success: true,
			data,
		});
	}

	async getTeams(_, res) {
		const data = await this.teamService.getTeams();

		res.json({
			success: true,
			data,
		});
	}

	async getTeam(req, res) {
		const data = await this.teamService.getTeam(req.params.id);

		res.json({
			success: true,
			data,
		});
	}

	async updateTeam(req, res) {
		const data = await this.teamService.updateTeam(
			req.params.id,
			req.body,
			req.user.id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async deleteTeam(req, res) {
		await this.teamService.deleteTeam(req.params.id, req.user.id);

		res.json({
			success: true,
			message: "Team deleted successfully",
		});
	}

	async addPlayers(req, res) {
		const data = await this.teamService.addPlayers(
			req.params.id,
			req.body.playerIds,
			req.user.id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async removePlayers(req, res) {
		const data = await this.teamService.removePlayers(
			req.params.id,
			req.body.playerIds,
			req.user.id,
		);

		res.json({
			success: true,
			data,
		});
	}
}

module.exports = TeamController;
