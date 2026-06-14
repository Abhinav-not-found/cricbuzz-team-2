const { StatusCodes } = require("http-status-codes");
const PlayerService = require("./player.service");

class PlayerController {
	constructor() {
		this.playerService = new PlayerService();
	}

	async createPlayer(req, res) {
		const payload = {
			...req.body,
			createdBy: req.user.id,
			updatedBy: req.user.id,
		};

		const player = await this.playerService.createPlayer(payload);

		res.status(StatusCodes.CREATED).json({
			success: true,
			message: "Player created successfully",
			data: player,
		});
	}

	async getAllPlayers(_, res) {
		const players = await this.playerService.getAllPlayers();

		res.status(StatusCodes.OK).json({
			success: true,
			data: players,
		});
	}

	async updatePlayer(req, res) {
		const { id } = req.params;

		const payload = {
			...req.body,
			updatedBy: req.user.id,
		};

		const player = await this.playerService.updatePlayer(id, payload);

		res.status(StatusCodes.OK).json({
			success: true,
			message: "Player updated successfully",
			data: player,
		});
	}

	async deletePlayer(req, res) {
		const { id } = req.params;

		await this.playerService.deletePlayer(id, req.user.id);

		res.status(StatusCodes.OK).json({
			success: true,
			message: "Player deleted successfully",
		});
	}
}

module.exports = PlayerController;
