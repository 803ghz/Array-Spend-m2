const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users.controller")
const registerRules = require("../middlewares/registerRules")
const loginRules = require("../middlewares/loginRules")
const validate = require("../middlewares/validate")

router.post(
	"/register",
	registerRules,
	validate,
	usersController.registerUser
)

router.post(
    "/login",
    loginRules,
    validate,
    usersController.loginUser
)

router.get("/whoami",
    usersController.whoAmI,
)

module.exports = router