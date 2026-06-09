import express from 'express';
const router = express.Router();

import * as usersController from "../controllers/users.controller.js";
import registerRules from "../middlewares/registerRules.js";
import loginRules from "../middlewares/loginRules.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js";
import { loginRegisterLimiter } from "../middlewares/rateLimit.js";

router.post(
    "/register",
    registerRules,
    validate,
    usersController.registerUser
);

router.post(
    "/login",
    loginRules,
    validate,
    usersController.loginUser
);

router.get(
    "/profile",
    verifyToken, 
    usersController.getProfile
);

export default router;