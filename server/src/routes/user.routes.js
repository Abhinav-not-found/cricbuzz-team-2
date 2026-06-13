const express = require("express");
const router = express.Router();
const {
  registerUserController,
  getUserController,
  loginUserController,
} = require("../controllers/user.controller.js");

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/get", getUserController);

module.exports = router;
