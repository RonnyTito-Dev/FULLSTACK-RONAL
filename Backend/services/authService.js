
// authService.js

// Importamos el User Model
const userModel = require('../models/userModel');

// Importamos el hash y el compare
const { hashPassword, comparePassword } = require('../utils/bcryptHelper');

// Importamos el manejador de erroes
const ApiError = require('../errors/apiError');

// Importamos JWT 
const jwt = require('jsonwebtoken');

// Importamos la clave secreta para firmar el JWT
const { jwt_config } = require('../config/config');




class AuthService {

    // Metodo para registrar un usuario
    async register({ name, email, password, role_id }) {
        if (!name || !email || !password) {
            throw ApiError.badRequest('Nombre, email, contraseña y rol son requeridos');
        }

        const existing = await userModel.getUserByEmail(email);
        if (existing) {
            throw ApiError.conflict('El correo ya está registrado');
        }

        const hashed = await hashPassword(password);
        const user = await userModel.createUser({ name, email, password: hashed, role_id });

        return user;
    }


    // Metodo pora login
    async login({ email, password }) {

        if (!email || !password) {
            throw ApiError.badRequest('Email y contraseña requeridos');
        }

        const user = await userModel.getUserByEmail(email.trim());

        if (!user) {
            throw ApiError.notFound('El usuario no existe');
        }

        // Comparar si la contraseña es correcta
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw ApiError.unauthorized('Contraseña incorrecta');
        }
        
        // Creamos el JWT 
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role_id },
            jwt_config.secretKey,
            { expiresIn: '1h' }
        );

        return token; // Retornar el token
    }
}

// Exportamos una instancia de AuthService
module.exports = new AuthService();
    