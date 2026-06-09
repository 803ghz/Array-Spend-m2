import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Users from "../models/users.models.js";

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        const emailChecked = await Users.validateEmail(email);

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

export async function loginUser(req, res) {
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });

        res.status(200).json({
            message: "Login correcto",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el login" });
    }
}

export async function getProfile(req, res) {
    try {
        const userId = req.user.id;

        const userFounded = await Users.findUserById(userId);

        return res.status(200).json({ message: "Usuario encontrado", user: userFounded });
    } catch (error) {
        res.status(500).json({ message: "Error interno del sistema" });
    }
}