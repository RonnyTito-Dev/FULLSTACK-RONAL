
// userController.js

// Importamos el UserService
const userService = require('../services/userService');

class UserController {

    // ============================= MÉTODOS GET ==============================

    // Método para obtener todos los usuarios
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un usuario por ID
    async getUserById(req, res, next) {
        const { id } = req.params;

        try {
            const user = await userService.getUserById(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un usuario por email
    async getUserByEmail(req, res, next) {
        const { email } = req.params;

        try {
            const user = await userService.getUserByEmail(email);
            res.json(user);
        } catch (error) {
            next(error);
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
            next(error);
        }
    }

    // ============================= MÉTODO PUT ==============================

    // Método para actualizar los datos de un usuario (excepto la contraseña)
    async updateUser(req, res, next) {
        const { id } = req.params;
        const { name, email, role_id } = req.body;

        try {
            const updatedUser = await userService.modifyUser(id, { name, email, role_id });
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    // Método para actualizar la contraseña de un usuario
    async updatePassword(req, res, next) {
        const { id } = req.params;
        const { password } = req.body;

        try {
            const updatedUser = await userService.modifyPassword(id, password);
            res.json(updatedUser);
        } catch (error) {
            next(error);
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
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new UserController();
