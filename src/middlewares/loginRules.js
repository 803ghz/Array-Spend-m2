const { body } = require("express-validator");

const loginRules = [
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isStrongPassword().withMessage("La contraseña es obligatoria"),
];

module.exports = loginRules;