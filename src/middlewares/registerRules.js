const {body, validationResult } = require("express-validator");

const registerRules = [
    body("email").isEmail().withMessage("El email no es válido").normalizeEmail(),
    body("password")
    .isLength({min: 6})
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

