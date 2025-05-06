
// movementReasonService.js

// Importamos el MovementReasons Model
const movementReasonModel = require('../models/movementReasonModel');

// Importamos la instancia de errores
const ApiError = require('../errors/apiError');

class MovementReasonService {

    // Metodo para obtener todas las razones de movimiento
    async getMovementReasons() {
        const movementReasons = await movementReasonModel.getAllMovementReasons();
        if (!movementReasons || movementReasons.length === 0) {
            throw ApiError.notFound('No hay razones de movimiento disponibles');
        }
        return movementReasons;
    }

    // Metodo para obtener una razón de movimiento por ID
    async getMovementReasonById(id) {
        const movementReason = await movementReasonModel.getMovementReasonById(id);
        if (!movementReason) {
            throw ApiError.notFound(`Razón de movimiento con ID ${id} no encontrada`);
        }
        return movementReason;
    }

    // Metodo para agregar una nueva razón de movimiento
    async addMovementReason(data) {
        if (!data.type || !data.reason) {
            throw ApiError.badRequest('Tipo y razón son requeridos');
        }
        return await movementReasonModel.createMovementReason(data);
    }

    // Metodo para editar una razón de movimiento
    async modifyMovementReason(id, data) {
        if (!data.type || !data.reason) {
            throw ApiError.badRequest('Tipo y razón son requeridos');
        }

        const existingMovementReason = await movementReasonModel.getMovementReasonById(id);
        if (!existingMovementReason) {
            throw ApiError.notFound(`Razón de movimiento con ID ${id} no encontrada para actualizar`);
        }

        return await movementReasonModel.updateMovementReason(id, data);
    }

    // Metodo para eliminar una razón de movimiento
    async removeMovementReason(id) {
        const existingMovementReason = await movementReasonModel.getMovementReasonById(id);
        if (!existingMovementReason) {
            throw ApiError.notFound(`Razón de movimiento con ID ${id} no encontrada para eliminar`);
        }

        await movementReasonModel.deleteMovementReason(id);
    }

}

// Exportamos una instancia de MovementReasonsService
module.exports = new MovementReasonService();
    