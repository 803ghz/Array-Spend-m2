import { rateLimit } from 'express-rate-limit';

export const loginRegisterLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {
        message: "Demasiados intentos desde esta IP, intentalo de nuevo en 15 minutos."
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});