const { Router } = require("express");
const SeriesController = require("./series.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const seriesController = new SeriesController();

router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN));

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
