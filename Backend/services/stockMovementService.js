
// stockMovementService.js

// Importamos el StockMovement Model
const stockMovementModel = require('../models/stockMovementModel');

const ApiError = require('../errors/apiError');

class StockMovementService {

    // Método para obtener todos los movimientos de stock
    async getAllStockMovements() {
        const movements = await stockMovementModel.getAllStockMovements();
        if (!movements || movements.length === 0) {
            throw ApiError.notFound('No hay movimientos de stock registrados');
        }
        return movements;
    }

    // Método para obtener un movimiento de stock por ID
    async getStockMovementById(id) {
        const movement = await stockMovementModel.getStockMovementById(id);
        if (!movement) {
            throw ApiError.notFound(`Movimiento de stock con ID ${id} no encontrado`);
        }
        return movement;
    }

    // Método para obtener movimientos de stock por ID de producto
    async getStockMovementsByProductId(product_id) {
        const movements = await stockMovementModel.getStockMovementsByProductId(product_id);
        if (!movements || movements.length === 0) {
            throw ApiError.notFound(`No se encontraron movimientos para el producto con ID ${product_id}`);
        }
        return movements;
    }

    // Método para obtener movimientos de stock por tipo (input o output)
    async getStockMovementsByType(type) {

        const movements = await stockMovementModel.getStockMovementsByType(type);
        if (!movements || movements.length === 0) {
            throw ApiError.notFound(`No se encontraron movimientos de tipo "${type}"`);
        }
        return movements;
    }

    // Método para obtener movimientos de stock por ID de usuario
    async getStockMovementsByUserId(user_id) {
        const movements = await stockMovementModel.getStockMovementsByUserId(user_id);
        if (!movements || movements.length === 0) {
            throw ApiError.notFound(`No se encontraron movimientos para el usuario con ID ${user_id}`);
        }
        return movements;
    }

    // Método para agregar un nuevo movimiento de stock
    async createStockMovement(data) {
        const { product_id, movement_reason_id, quantity, user_id } = data;

        if (!product_id || !movement_reason_id || !quantity || !user_id) {
            throw ApiError.badRequest('Todos los campos son requeridos');
        }

        return await stockMovementModel.createStockMovement(data);
    }

    // Método para actualizar un movimiento de stock
    async updateStockMovement(id, data) {
        const existing = await stockMovementModel.getStockMovementById(id);
        if (!existing) {
            throw ApiError.notFound(`Movimiento de stock con ID ${id} no encontrado`);
        }

        const { product_id, movement_reason_id, quantity, user_id } = data;
        if (!product_id || !movement_reason_id || !quantity || !user_id) {
            throw ApiError.badRequest('Todos los campos son requeridos para actualizar el movimiento');
        }

        return await stockMovementModel.updateStockMovement(id, data);
    }

    // Método para eliminar un movimiento de stock
    async deleteStockMovement(id) {
        const existing = await stockMovementModel.getStockMovementById(id);
        if (!existing) {
            throw ApiError.notFound(`Movimiento de stock con ID ${id} no encontrado`);
        }

        await stockMovementModel.deleteStockMovement(id);
    }

}

// Exportamos una instancia de StockMovementService
module.exports = new StockMovementService();
    