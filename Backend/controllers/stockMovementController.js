
// stockMovementController.js

// Importamos el StockMovementService
const stockMovementService = require('../services/stockMovementService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class StockMovementController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los movimientos de stock
    async getAllStockMovements(req, res, next) {
        try {
            const movements = await stockMovementService.getAllStockMovements();
            res.json(movements);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un movimiento de stock por ID
    async getStockMovementById(req, res, next) {
        const { id } = req.params;

        try {
            const movement = await stockMovementService.getStockMovementById(id);
            res.json(movement);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener movimientos de stock por ID de producto
    async getStockMovementsByProductId(req, res, next) {
        const { product_id } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByProductId(product_id);
            res.json(movements);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener movimientos de stock por tipo (input o output)
    async getStockMovementsByType(req, res, next) {
        const { type } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByType(type);
            res.json(movements);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener movimientos de stock por ID de usuario
    async getStockMovementsByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByUserId(user_id);
            res.json(movements);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo movimiento de stock
    async createStockMovement(req, res, next) {
        const { product_id, movement_reason_id, quantity, user_id } = req.body;

        try {
            const newMovement = await stockMovementService.createStockMovement({ product_id, movement_reason_id, quantity ,user_id });
            res.status(201).json(newMovement);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un movimiento de stock
    async updateStockMovement(req, res, next) {
        const { id } = req.params;
        const { product_id, movement_reason_id, quantity, user_id } = req.body;

        try {
            const updatedMovement = await stockMovementService.updateStockMovement(id, { product_id, movement_reason_id, quantity ,user_id  });
            res.json(updatedMovement);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar un movimiento de stock
    async deleteStockMovement(req, res, next) {
        const { id } = req.params;

        try {
            await stockMovementService.deleteStockMovement(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new StockMovementController();
