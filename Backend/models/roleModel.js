
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

    // Obtener un rol por Nomnbre
    async getRoleByName(name) {
        const result = await db.query('SELECT * FROM roles WHERE name = $1', [name]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear un nuevo rol
    async createRole({ name, description }) {
        const result = await db.query(
            `INSERT INTO roles (name, description)
             VALUES ($1, $2)
             RETURNING *`,
            [name, description]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar un rol
    async updateRole(id, { name, description }) {
        const result = await db.query(
            `UPDATE roles
             SET name = $1, description = $2
             WHERE id = $3
             RETURNING *`,
            [name, description, id]
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
    