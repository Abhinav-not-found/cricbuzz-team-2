const { Router } = require("express");
const asyncHandler = require("../../shared/utils/asyncHandler");
const CommentaryController = require("./commentary.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const commentaryController = new CommentaryController();

router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN));
router.post(
	"/",
	asyncHandler(
		commentaryController.createCommentary.bind(commentaryController),
	),
);
router.get(
	"/",
	asyncHandler(
		commentaryController.getAllCommentaries.bind(commentaryController),
	),
);
router.get(
	"/:id",
	asyncHandler(
		commentaryController.getCommentaryById.bind(commentaryController),
	),
);
router.patch(
	"/:id",
	asyncHandler(
		commentaryController.updateCommentary.bind(commentaryController),
	),
);
router.delete(
	"/:id",
	asyncHandler(
		commentaryController.deleteCommentary.bind(commentaryController),
	),
);

module.exports = router;
