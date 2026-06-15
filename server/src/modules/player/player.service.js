const ApiError = require("../../shared/utils/ApiError");
const PlayerRepository = require("../../repository/player.repository");

class PlayerService {
	constructor() {
		this.playerRepository = new PlayerRepository();
	}

	async createPlayer(payload) {
		return this.playerRepository.create(payload);
	}

	async getAllPlayers() {
		return this.playerRepository.findAll();
	}
	async getOnePlayer(id) {
		const player = await this.playerRepository.findById(id);
		if (!player) throw new ApiError(404, "Player not found");

		return player;
	}

	async updatePlayer(id, payload) {
		const player = await this.playerRepository.findById(id);
		if (!player) throw new ApiError(404, "Player not found");

		return this.playerRepository.update(id, payload);
	}

	async deletePlayer(id, updatedBy) {
		const player = await this.playerRepository.findById(id);
		if (!player) throw new ApiError(404, "Player not found");

		return this.playerRepository.softDelete(id, updatedBy);
	}
}

module.exports = PlayerService;
