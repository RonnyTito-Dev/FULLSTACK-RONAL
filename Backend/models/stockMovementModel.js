
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

    // Obtener movimientos de stock por tipo (in 1 o out 2)
    async getStockMovementsByType(type) {
        const result = await db.query('SELECT * FROM stock_movements WHERE movement_reason_id = $1 ORDER BY created_at DESC', [type]);
        return result.rows;
    }

    // Obtener movimientos de stock por usuario
    async getStockMovementsByUserId(user_id) {
        const result = await db.query('SELECT * FROM stock_movements WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        return result.rows;
    }



    // ============================= METODO POST =============================

    // Crear un nuevo movimiento de stock
    async createStockMovement({ product_id, movement_reason_id, quantity, user_id }) {
        const result = await db.query(
            `INSERT INTO stock_movements (product_id, movement_reason_id, quantity, user_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [product_id, movement_reason_id, quantity, user_id]
        );
        return result.rows[0];
    }

    // ============================= METODO PUT ==============================

    // Actualizar un movimiento de stock
    async updateStockMovement(id, { product_id, movement_reason_id, quantity, user_id }) {
        const result = await db.query(
            `UPDATE stock_movements
             SET product_id = $1, movement_reason_id = $2, quantity = $3, user_id = $4
             WHERE id = $5
             RETURNING *`,
            [product_id, movement_reason_id, quantity, user_id, id]
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
    