class MatchService {
	async createMatch(data, userId) {
		if (data.team1 === data.team2) {
			throw new ApiError(400, "Team 1 and Team 2 cannot be same");
		}

		return this.matchRepository.create({
			...data,
			createdBy: userId,
			updatedBy: userId,
		});
	}
	async getMatches() {
		return this.matchRepository.findAll();
	}
	async getMatch(id) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return match;
	}
	async updateMatch(id, data, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return this.matchRepository.update(id, {
			...data,
			updatedBy: userId,
		});
	}
	async deleteMatch(id, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return this.matchRepository.update(id, {
			isDeleted: true,
			updatedBy: userId,
		});
	}
	async updatePlayingXI(id, playingXI, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		if (playingXI.team1.length !== 11 || playingXI.team2.length !== 11) {
			throw new ApiError(400, "Playing XI must contain exactly 11 players");
		}

		return this.matchRepository.update(id, {
			playingXI,
			updatedBy: userId,
		});
	}
	async updateToss(id, tossData, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return this.matchRepository.update(id, {
			tossWinner: tossData.tossWinner,
			tossDecision: tossData.tossDecision,
			updatedBy: userId,
		});
	}
	async updateResult(id, resultData, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return this.matchRepository.update(id, {
			winner: resultData.winner,
			result: resultData.result,
			status: "COMPLETED",
			updatedBy: userId,
		});
	}
	async updateStatus(id, status, userId) {
		const match = await this.matchRepository.findById(id);

		if (!match) {
			throw new ApiError(404, "Match not found");
		}

		return this.matchRepository.update(id, {
			status,
			updatedBy: userId,
		});
	}
}

module.exports = MatchService;
