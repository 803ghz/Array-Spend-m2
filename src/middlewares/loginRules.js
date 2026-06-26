import { body } from "express-validator";

const loginRules = [
    body("email").isEmail().withMessage("Email no válido").normalizeEmail(),
    body("password").notEmpty().isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export default loginRules;