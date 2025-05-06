
// authController.js

// Importamos el Auth Service
const authService = require('../services/authService');

class AuthController {

    // ================================= METODO POST =================================

    // Login de un usuario
    async login(req, res, next) {
        try {
            const token = await authService.login(req.body);

            // Enviar la cookie al front
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: false, // false para http y true para https
                sameSite: 'Lax',
                maxAge: 3600000 // 1 hora
            });

            res.status(200).json({ message: 'Login exitoso' });
            
        } catch (error) {
            next(error);
        }
    }


    // Obtener datos del usuario
    me(req, res, next){
        try {
            const { user } = req;

            res.status(200).json({
                id: user.userId,
                email: user.email,
                role: user.role
            });

        } catch(error){
            next(error);
        }
    }



    // Logout del usuario
    async logout(req, res, next) {

        try {

            // Eliminamos la cookie del token
            res.clearCookie('authToken', {
                httpOnly: true,
                secure: false, // false para http y true para https
                sameSite: 'Lax',
            });

            res.status(200).json({ message: 'Logout exitoso' });

        } catch(error){
            next(error);
        }
    }
    
}

// Exportar una instancia de AuthController
module.exports = new AuthController();
    