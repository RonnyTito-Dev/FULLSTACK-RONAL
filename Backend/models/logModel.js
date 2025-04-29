
// logModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu LogModel 
class LogModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los logs
    async getAllLogs() {
        const result = await db.query('SELECT * FROM logs ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener un log por ID
    async getLogById(id) {
        const result = await db.query('SELECT * FROM logs WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener logs por usuario
    async getLogsByUserId(user_id) {
        const result = await db.query('SELECT * FROM logs WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        return result.rows;
    }



    // ============================= METODO POST =============================

    // Crear un nuevo log
    async createLog({ user_id, action, affected_table }) {
        const result = await db.query(
            `INSERT INTO logs (user_id, action, affected_table)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [user_id, action, affected_table]
        );
        return result.rows[0];
    }
    
}

// Exportar una instancia de la clase LogModel
module.exports = new LogModel();
    