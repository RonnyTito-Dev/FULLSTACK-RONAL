
// stockMovementModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu StockMovementModel 
class StockMovementModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los movimientos de stock
    async getAllStockMovements() {
        const result = await db.query('SELECT * FROM stock_movements ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener un movimiento de stock por ID
    async getStockMovementById(id) {
        const result = await db.query('SELECT * FROM stock_movements WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener movimientos de stock por producto
    async getStockMovementsByProductId(product_id) {
        const result = await db.query('SELECT * FROM stock_movements WHERE product_id = $1 ORDER BY created_at DESC', [product_id]);
        return result.rows;
    }

    // Obtener movimientos de stock por tipo (input o output)
    async getStockMovementsByType(type) {
        const result = await db.query('SELECT * FROM stock_movements WHERE type = $1 ORDER BY created_at DESC', [type]);
        return result.rows;
    }

    // Obtener movimientos de stock por usuario
    async getStockMovementsByUserId(user_id) {
        const result = await db.query('SELECT * FROM stock_movements WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        return result.rows;
    }



    // ============================= METODO POST =============================

    // Crear un nuevo movimiento de stock
    async createStockMovement({ product_id, type, quantity, reason, user_id }) {
        const result = await db.query(
            `INSERT INTO stock_movements (product_id, type, quantity, reason, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [product_id, type, quantity, reason, user_id]
        );
        return result.rows[0];
    }

    // ============================= METODO PUT ==============================

    // Actualizar un movimiento de stock
    async updateStockMovement(id, { product_id, type, quantity, reason, user_id }) {
        const result = await db.query(
            `UPDATE stock_movements
             SET product_id = $1, type = $2, quantity = $3, reason = $4, user_id = $5
             WHERE id = $6
             RETURNING *`,
            [product_id, type, quantity, reason, user_id, id]
        );
        return result.rows[0];
    }

    // ============================= METODO DELETE ===========================

    // Eliminar un movimiento de stock
    async deleteStockMovement(id) {
        await db.query('DELETE FROM stock_movements WHERE id = $1', [id]);
    }

    
}

// Exportar una instancia de la clase StockMovementModel
module.exports = new StockMovementModel();
    