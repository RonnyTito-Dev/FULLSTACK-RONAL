// authMiddleware.js

// Importamos el jwt
const jwt = require('jsonwebtoken');

// Importamos la llave secreta para jwt
const { jwt_config } = require('../config/config');

// Importamos el manejador de errores
const ApiError = require('../errors/apiError');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;

    // Verificamos si hay existe el tocken
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token faltante' });
    }

    try {
        // Verificamos y decodicamos
        const decoded = jwt.verify(token, jwt_config.secretKey);
        
        req.user = decoded; // Guardamos en la solicitud
        next(); // Pasa al siguiente middleware o controller

    } catch(error) {
        next(ApiError.unauthorized('Token invalido o expirado'));
    }
}

module.exports = authMiddleware;