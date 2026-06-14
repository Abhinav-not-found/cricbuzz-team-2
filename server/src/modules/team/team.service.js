const ApiError = require("../../shared/utils/ApiError");
const TeamRepository = require("../../repository/team.repository");

class TeamService {
	constructor() {
		this.teamRepository = new TeamRepository();
	}

	async createTeam(data, userId) {
		const existingTeam = await this.teamRepository.findByName(data.name);
		if (existingTeam) throw new ApiError(409, "Team already exists");

		return this.teamRepository.create({
			...data,
			createdBy: userId,
			updatedBy: userId,
		});
	}

	async getTeams() {
		return this.teamRepository.findAll();
	}

	async getTeam(id) {
		const team = await this.teamRepository.findById(id);
		if (!team) throw new ApiError(404, "Team not found");

		return team;
	}

	async updateTeam(id, data, userId) {
		const team = await this.teamRepository.findById(id);
		if (!team) throw new ApiError(404, "Team not found");

		return this.teamRepository.update(id, {
			...data,
			updatedBy: userId,
		});
	}

	async deleteTeam(id, userId) {
		const team = await this.teamRepository.findById(id);
		if (!team) throw new ApiError(404, "Team not found");

		return this.teamRepository.update(id, {
			isDeleted: true,
			updatedBy: userId,
		});
	}
	async addPlayers(teamId, playerIds, userId) {
		const team = await this.teamRepository.findById(teamId);
		if (!team) throw new ApiError(404, "Team not found");

		const existingPlayers = team.squadPlayers.map((id) => id.toString());
		const incomingPlayers = playerIds.map((id) => id.toString());

		// find duplicates
		const duplicates = incomingPlayers.filter((id) =>
			existingPlayers.includes(id),
		);

		if (duplicates.length > 0) {
			throw new ApiError(
				409,
				`Player(s) already exist in team: ${duplicates.join(", ")}`,
			);
		}

		const updatedPlayers = [...existingPlayers, ...incomingPlayers];

		return this.teamRepository.update(teamId, {
			squadPlayers: updatedPlayers,
			updatedBy: userId,
		});
	}

	async removePlayers(teamId, playerIds, userId) {
		const team = await this.teamRepository.findById(teamId);
		if (!team) throw new ApiError(404, "Team not found");

		const updatedPlayers = team.squadPlayers.filter(
			(player) => !playerIds.includes(player.toString()),
		);

		return this.teamRepository.update(teamId, {
			squadPlayers: updatedPlayers,
			updatedBy: userId,
		});
	}
}

module.exports = TeamService;
