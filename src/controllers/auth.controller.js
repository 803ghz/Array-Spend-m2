const bcrypt = require("bcrypt");
const Users = require("./models/users.models.js")

async function registerUser(req, res) {

    try {

    const { email, password } = req.body;

    const existEmail = Users.findOne({
        email: email });

        if (existEmail) {
            return res.status(409).json({ error: "Este email ya ha sido registrado" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await Users.createdUser({
            email, password: passwordHashed
        })

        res.status(201).json({
            id: newUser._id,
            email: newUser.email,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el registro" });
    }
}