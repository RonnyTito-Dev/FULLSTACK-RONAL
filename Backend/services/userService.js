
// userService.js

// Importamos el User Model
const userModel = require('../models/userModel');

class UserService {

    // Método para obtener todos los usuarios
    async getUsers() {
        return await userModel.getAllUsers();
    }

    // Método para obtener un usuario por ID
    async getUserById(id) {
        return await userModel.getUserById(id);
    }

    // Método para obtener un usuario por email (útil para login)
    async getUserByEmail(email) {
        return await userModel.getUserByEmail(email);
    }

    // Método para agregar un nuevo usuario
    async addUser(data) {
        return await userModel.createUser(data);
    }

    // Método para modificar los datos de un usuario (excepto la contraseña)
    async modifyUser(id, data) {
        return await userModel.updateUser(id, data);
    }

    // Método para actualizar la contraseña de un usuario
    async modifyPassword(id, newPassword) {
        return await userModel.updatePassword(id, newPassword);
    }

    // Método para eliminar un usuario
    async removeUser(id) {
        await userModel.deleteUser(id);
    }

}

// Exportamos una instancia de UserService
module.exports = new UserService();
    