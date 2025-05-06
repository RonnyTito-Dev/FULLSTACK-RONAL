
// movementReasonModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu MovementReasonsModel 
class MovementReasonModel {

        //======================================= METODOS GET =======================================

    // Metodo para obtener todos los registros
    async getAllMovementReasons() {
        const result = await db.query('SELECT * FROM movement_reasons');
        return result.rows;
    }

    // Metodo para obtener un movimiento de razón por ID
    async getMovementReasonById(id) {
        const result = await db.query('SELECT * FROM movement_reasons WHERE id = $1', [id]);
        return result.rows[0];
    }

    //======================================= METODO POST =======================================

    // Metodo para agregar una nueva razón de movimiento
    async createMovementReason({ type, reason }) {
        const result = await db.query('INSERT INTO movement_reasons (type, reason) VALUES ($1, $2) RETURNING *', [type, reason]);
        return result.rows[0];
    }

    //======================================= METODO PUT =======================================

    // Metodo para actualizar una razón de movimiento
    async updateMovementReason(id, { type, reason }) {
        const result = await db.query('UPDATE movement_reasons SET type = $1, reason = $2 WHERE id = $3 RETURNING *', [type, reason, id]);
        return result.rows[0];
    }

    //====================================== METODO DELETE =====================================

    // Metodo para eliminar una razón de movimiento
    async deleteMovementReason(id) {
        await db.query('DELETE FROM movement_reasons WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase MovementReasonsModel
module.exports = new MovementReasonModel();
    