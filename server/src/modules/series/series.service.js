const ApiError = require("../../shared/utils/ApiError");
const SeriesRepository = require("./series.repository");

class SeriesService {
	constructor() {
		this.seriesRepository = new SeriesRepository();
	}

	async createSeries(data, userId) {
		const existingSeries = await this.seriesRepository.findByName(data.name);

		if (existingSeries) {
			throw new ApiError(409, "Series already exists");
		}

		return this.seriesRepository.create({
			...data,
			createdBy: userId,
			updatedBy: userId,
		});
	}

	async getSeriesList() {
		return this.seriesRepository.findAll();
	}

	async getSeries(id) {
		const series = await this.seriesRepository.findById(id);

		if (!series) {
			throw new ApiError(404, "Series not found");
		}

		return series;
	}

	async updateSeries(id, data, userId) {
		const series = await this.seriesRepository.findById(id);

		if (!series) {
			throw new ApiError(404, "Series not found");
		}

		return this.seriesRepository.update(id, {
			...data,
			updatedBy: userId,
		});
	}

	async deleteSeries(id, userId) {
		const series = await this.seriesRepository.findById(id);

		if (!series) {
			throw new ApiError(404, "Series not found");
		}

		return this.seriesRepository.update(id, {
			isDeleted: true,
			updatedBy: userId,
		});
	}
}

module.exports = SeriesService;
