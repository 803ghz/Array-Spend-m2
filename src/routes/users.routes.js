const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users.controller")
const registerRules = require("../middlewares/registerRules")
const loginRules = require("../middlewares/loginRules")
const validate = require("../middlewares/validate")
const verifyToken = require("../middlewares/verifyToken")

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

router.get("/profile",
    verifyToken, usersController.getProfile)

module.exports = router