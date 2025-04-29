
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
            next(ApiError.internal('Error al obtener los movimientos de stock'));
        }
    }

    // Método para obtener un movimiento de stock por ID
    async getStockMovementById(req, res, next) {
        const { id } = req.params;

        try {
            const movement = await stockMovementService.getStockMovementById(id);

            if (!movement) {
                return next(ApiError.notFound('Movimiento de stock no encontrado'));
            }

            res.json(movement);
        } catch (error) {
            next(ApiError.internal('Error al obtener el movimiento de stock'));
        }
    }

    // Método para obtener movimientos de stock por ID de producto
    async getStockMovementsByProductId(req, res, next) {
        const { product_id } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByProductId(product_id);

            if (!movements.length) {
                return next(ApiError.notFound('No se encontraron movimientos para este producto'));
            }

            res.json(movements);
        } catch (error) {
            next(ApiError.internal('Error al obtener los movimientos de stock del producto'));
        }
    }

    // Método para obtener movimientos de stock por tipo (input o output)
    async getStockMovementsByType(req, res, next) {
        const { type } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByType(type);

            if (!movements.length) {
                return next(ApiError.notFound('No se encontraron movimientos de stock para este tipo'));
            }

            res.json(movements);
        } catch (error) {
            next(ApiError.internal('Error al obtener los movimientos de stock por tipo'));
        }
    }

    // Método para obtener movimientos de stock por ID de usuario
    async getStockMovementsByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const movements = await stockMovementService.getStockMovementsByUserId(user_id);

            if (!movements.length) {
                return next(ApiError.notFound('No se encontraron movimientos de stock para este usuario'));
            }

            res.json(movements);
        } catch (error) {
            next(ApiError.internal('Error al obtener los movimientos de stock del usuario'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo movimiento de stock
    async createStockMovement(req, res, next) {
        const { product_id, user_id, type, quantity, reason } = req.body;

        try {
            const newMovement = await stockMovementService.createStockMovement({ product_id, user_id, type, quantity, reason });
            res.status(201).json(newMovement);
        } catch (error) {
            next(ApiError.internal('Error al crear el movimiento de stock'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un movimiento de stock
    async updateStockMovement(req, res, next) {
        const { id } = req.params;
        const { product_id, user_id, type, quantity, reason } = req.body;

        try {
            const updatedMovement = await stockMovementService.updateStockMovement(id, { product_id, user_id, type, quantity, reason });

            if (!updatedMovement) {
                return next(ApiError.notFound('Movimiento de stock no encontrado para actualizar'));
            }

            res.json(updatedMovement);
        } catch (error) {
            next(ApiError.internal('Error al actualizar el movimiento de stock'));
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
            next(ApiError.internal('Error al eliminar el movimiento de stock'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new StockMovementController();
