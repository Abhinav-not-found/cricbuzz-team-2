const { Router } = require("express");
const UserController = require("./user.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/model.constant");

const router = Router();
const userController = new UserController();

router.use(
	AuthMiddleware.authenticate,
	AuthMiddleware.authorize(ROLES.SUPER_ADMIN),
);

router.get("/", asyncHandler(userController.getAllUsers.bind(userController)));
router.post("/", asyncHandler(userController.createUser.bind(userController)));
router.put("/:id", asyncHandler(userController.updateUser.bind(userController)));
router.patch(
	"/:id/soft-delete",
	asyncHandler(userController.softDeleteUser.bind(userController)),
);
router.delete(
	"/:id",
	asyncHandler(userController.hardDeleteUser.bind(userController)),
);
router.patch(
	"/:id/role",
	asyncHandler(userController.changeRole.bind(userController)),
);

module.exports = router;
