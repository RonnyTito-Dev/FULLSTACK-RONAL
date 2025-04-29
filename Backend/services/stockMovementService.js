
// stockMovementService.js

// Importamos el StockMovement Model
const stockMovementModel = require('../models/stockMovementModel');

class StockMovementService {

    // Método para obtener todos los movimientos de stock
    async getAllStockMovements() {
        return await stockMovementModel.getAllStockMovements();
    }

    // Método para obtener un movimiento de stock por ID
    async getStockMovementById(id) {
        return await stockMovementModel.getStockMovementById(id);
    }

    // Método para obtener movimientos de stock por ID de producto
    async getStockMovementsByProductId(product_id) {
        return await stockMovementModel.getStockMovementsByProductId(product_id);
    }

    // Método para obtener movimientos de stock por tipo (input o output)
    async getStockMovementsByType(type) {
        return await stockMovementModel.getStockMovementsByType(type);
    }

    // Método para obtener movimientos de stock por ID de usuario
    async getStockMovementsByUserId(user_id) {
        return await stockMovementModel.getStockMovementsByUserId(user_id);
    }

    // Método para agregar un nuevo movimiento de stock
    async createStockMovement(data) {
        return await stockMovementModel.createStockMovement(data);
    }

    // Método para actualizar un movimiento de stock
    async updateStockMovement(id, data) {
        return await stockMovementModel.updateStockMovement(id, data);
    }

    // Método para eliminar un movimiento de stock
    async deleteStockMovement(id) {
        await stockMovementModel.deleteStockMovement(id);
    }

}

// Exportamos una instancia de StockMovementService
module.exports = new StockMovementService();
    