const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users.controller")
const registerRules = require("../middlewares/registerRules")
const validate = require("../middlewares/validate")

router.post("/register", validate, usersController)

module.exports = router