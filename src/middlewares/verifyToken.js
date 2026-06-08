const jwt = require("jsonwebtoken");

function verifyToken(req, res , next) {
    
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {

            return res.status(401).json({ message: "No hay token" });
        }

        const token = authHeader.split(" ")

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifiedToken;

        next()

    } catch (error) { res.status(500).json({ message: "Error interno del servidor", error})}


}

module.exports = verifyToken;