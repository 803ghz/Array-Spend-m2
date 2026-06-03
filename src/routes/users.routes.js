const {Router} = require("express");
const usersController = require("./controllers/user.controller.js");

const router = 

router.post('/', usersController.registerUser)