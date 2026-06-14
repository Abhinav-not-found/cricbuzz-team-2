const { Router } = require("express");

const router = Router();

const SeriesController = require("./series.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");

const seriesController = new SeriesController();

router.post(
	"/",
	asyncHandler(seriesController.createSeries.bind(seriesController)),
);

router.get(
	"/",
	asyncHandler(seriesController.getSeriesList.bind(seriesController)),
);

router.get(
	"/:id",
	asyncHandler(seriesController.getSeries.bind(seriesController)),
);

router.patch(
	"/:id",
	asyncHandler(seriesController.updateSeries.bind(seriesController)),
);

router.delete(
	"/:id",
	asyncHandler(seriesController.deleteSeries.bind(seriesController)),
);

module.exports = router;
