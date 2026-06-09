import { body } from "express-validator";

const loginRules = [
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isStrongPassword().withMessage("La contraseña es obligatoria"),
];

export default loginRules;