const jwt = require("jsonwebtoken");

function verifyToken(req, res , next) {
    
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({ message: "No hay token o el formato es incorrecto" });
        }

        const token = authHeader.split(" ")

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifiedToken;

        next()

    } catch (error) { if ((error.name === "TokenExpiredError")) {
        return res.status(401).json({ message: "Tu sesión ha caducado", error})}
    }

    return res.status(401).json({ message: "Token incorrecto" });

}

module.exports = verifyToken;