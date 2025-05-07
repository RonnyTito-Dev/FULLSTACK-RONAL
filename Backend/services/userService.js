
// userService.js

// Importamos el User Model
const userModel = require('../models/userModel');

const ApiError = require('../errors/apiError');
const { hashPassword } = require('../utils/bcryptHelper');

class UserService {

    // Método para obtener todos los usuarios
    async getUsers() {
        const users = await userModel.getAllUsers();
        if (!users || users.length === 0) {
            throw ApiError.notFound('No hay usuarios registrados');
        }
        return users;
    }

    // Método para obtener un usuario por ID
    async getUserById(id) {
        const user = await userModel.getUserById(id);
        if (!user) {
            throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    // Método para obtener un usuario por email (útil para login)
    async getUserByEmail(email) {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            throw ApiError.notFound(`Usuario con email ${email} no encontrado`);
        }
        return user;
    }

    // Método para agregar un nuevo usuario
    async addUser(data) {

        const { name, email, password, role_id } = data;

        if (!name || !email || !password || !role_id) {
            throw ApiError.badRequest('Nombre, email, contraseña y rol son requeridos');
        }

        const existing = await userModel.getUserByEmail(email.trim());
        if (existing) {
            throw ApiError.conflict(`El email ${email} ya está registrado`);
        }

        const hashed = await hashPassword(password);

        return await userModel.createUser({ name, email, password: hashed, role_id });
    }



    // Método para modificar los datos de un usuario (excepto la contraseña)
    async modifyUser(id, data) {
        if (!data.name || !data.email || !data.role_id) {
            throw ApiError.badRequest('Nombre, email y rol son requeridos');
        }
    
        const existing = await userModel.getUserById(id);
        if (!existing) {
            throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
        }
    
        // Validar solo si el email cambió
        if (data.email.trim() !== existing.email) {
            const existingEmail = await userModel.getUserByEmail(data.email.trim());
            if (existingEmail) {
                throw ApiError.conflict(`El email ${data.email} ya está registrado por otro usuario`);
            }
        }
    
        return await userModel.updateUser(id, data);
    }
    

    // Método para actualizar la contraseña de un usuario
    async modifyPassword(id, password) {
        const user = await userModel.getUserById(id);
        if (!user) {
            throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
        }

        if (!password) {
            throw ApiError.badRequest('La nueva contraseña es requerida');
        }

        const hashed = await hashPassword(password);

        return await userModel.updatePassword(id, hashed);
    }

    // Método para eliminar un usuario
    async removeUser(id) {
        const user = await userModel.getUserById(id);
        if (!user) {
            throw ApiError.notFound(`Usuario con ID ${id} no encontrado`);
        }

        await userModel.deleteUser(id);
    }

}

// Exportamos una instancia de UserService
module.exports = new UserService();
    