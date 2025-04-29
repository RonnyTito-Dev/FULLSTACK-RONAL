
// roleModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu RoleModel 
class RoleModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los roles
    async getAllRoles() {
        const result = await db.query('SELECT * FROM roles ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener un rol por ID
    async getRoleById(id) {
        const result = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear un nuevo rol
    async createRole({ name }) {
        const result = await db.query(
            `INSERT INTO roles (name)
             VALUES ($1)
             RETURNING *`,
            [name]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar un rol
    async updateRole(id, { name }) {
        const result = await db.query(
            `UPDATE roles
             SET name = $1
             WHERE id = $2
             RETURNING *`,
            [name, id]
        );
        return result.rows[0];
    }



    // ============================= METODO DELETE ===========================

    // Eliminar un rol
    async deleteRole(id) {
        await db.query('DELETE FROM roles WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase RoleModel
module.exports = new RoleModel();
    