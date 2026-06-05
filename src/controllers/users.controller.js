const bcrypt = require("bcrypt");
const Users = require("../models/users.models.js")

async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        const emailChecked = await Users.validateEmail(email)

        if (emailChecked) {
            return res.status(409).json({ error: "Este email ya ha sido registrado" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const newUser = await Users.createUser({ email, password: passwordHashed });

        res.status(201).json({
            id: newUser._id,
            email: newUser.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el registro" });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        res.status(200).json({
            message: "Login correcto",
            id: user._id,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el login" });
    }
}

module.exports = {
    registerUser,
    loginUser
};