
// userModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu UserModel 
class UserModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los usuarios
    async getAllUsers() {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    }

    // Obtener un usuario por ID
    async getUserById(id) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener un usuario por email (útil para login)
    async getUserByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear un nuevo usuario
    async createUser({ name, email, password, role_id }) {
        const result = await db.query(
            `INSERT INTO users (name, email, password, role_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, email, password, role_id]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar datos de un usuario (excepto la contraseña)
    async updateUser(id, { name, email, role_id }) {
        const result = await db.query(
            `UPDATE users
             SET name = $1, email = $2, role_id = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, role_id, id]
        );
        return result.rows[0];
    }

    // Actualizar la contraseña de un usuario
    async updatePassword(id, newPassword) {
        const result = await db.query(
            `UPDATE users
             SET password = $1
             WHERE id = $2
             RETURNING *`,
            [newPassword, id]
        );
        return result.rows[0];
    }



    // ============================ METODO DELETE ============================

    // Eliminar un usuario
    async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase UserModel
module.exports = new UserModel();
    