
// userController.js

// Importamos el UserService
const userService = require('../services/userService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class UserController {

    // ============================= MÉTODOS GET ==============================

    // Método para obtener todos los usuarios
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (error) {
            next(ApiError.internal('Error al obtener los usuarios'));
        }
    }

    // Método para obtener un usuario por ID
    async getUserById(req, res, next) {
        const { id } = req.params;

        try {
            const user = await userService.getUserById(id);

            if (!user) {
                return next(ApiError.notFound('Usuario no encontrado'));
            }

            res.json(user);
        } catch (error) {
            next(ApiError.internal('Error al obtener el usuario'));
        }
    }

    // Método para obtener un usuario por email
    async getUserByEmail(req, res, next) {
        const { email } = req.params;

        try {
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return next(ApiError.notFound('Usuario no encontrado'));
            }

            res.json(user);
        } catch (error) {
            next(ApiError.internal('Error al obtener el usuario'));
        }
    }

    // ============================= MÉTODO POST ==============================

    // Método para crear un nuevo usuario
    async createUser(req, res, next) {
        const { name, email, password, role_id } = req.body;

        try {
            const newUser = await userService.addUser({ name, email, password, role_id });
            res.status(201).json(newUser);
        } catch (error) {
            next(ApiError.internal('Error al crear el usuario'));
        }
    }

    // ============================= MÉTODO PUT ==============================

    // Método para actualizar los datos de un usuario (excepto la contraseña)
    async updateUser(req, res, next) {
        const { id } = req.params;
        const { name, email, role_id } = req.body;

        try {
            const updatedUser = await userService.modifyUser(id, { name, email, role_id });

            if (!updatedUser) {
                return next(ApiError.notFound('Usuario no encontrado para actualizar'));
            }

            res.json(updatedUser);
        } catch (error) {
            next(ApiError.internal('Error al actualizar el usuario'));
        }
    }

    // Método para actualizar la contraseña de un usuario
    async updatePassword(req, res, next) {
        const { id } = req.params;
        const { newPassword } = req.body;

        try {
            const updatedUser = await userService.modifyPassword(id, newPassword);

            if (!updatedUser) {
                return next(ApiError.notFound('Usuario no encontrado para actualizar la contraseña'));
            }

            res.json(updatedUser);
        } catch (error) {
            next(ApiError.internal('Error al actualizar la contraseña del usuario'));
        }
    }

    // ============================= MÉTODO DELETE ==============================

    // Método para eliminar un usuario
    async deleteUser(req, res, next) {
        const { id } = req.params;

        try {
            await userService.removeUser(id);
            res.sendStatus(204);
        } catch (error) {
            next(ApiError.internal('Error al eliminar el usuario'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new UserController();
