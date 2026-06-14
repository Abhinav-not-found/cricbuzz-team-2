const SeriesService = require("./series.service");

class SeriesController {
	constructor() {
		this.seriesService = new SeriesService();
	}

	async createSeries(req, res) {
		const data = await this.seriesService.createSeries(req.body, req.user._id);

		res.status(201).json({
			success: true,
			data,
		});
	}

	async getSeriesList(_, res) {
		const data = await this.seriesService.getSeriesList();

		res.json({
			success: true,
			data,
		});
	}

	async getSeries(req, res) {
		const data = await this.seriesService.getSeries(req.params.id);

		res.json({
			success: true,
			data,
		});
	}

	async updateSeries(req, res) {
		const data = await this.seriesService.updateSeries(
			req.params.id,
			req.body,
			req.user._id,
		);

		res.json({
			success: true,
			data,
		});
	}

	async deleteSeries(req, res) {
		await this.seriesService.deleteSeries(req.params.id, req.user._id);

		res.json({
			success: true,
			message: "Series deleted successfully",
		});
	}
}

module.exports = SeriesController;
