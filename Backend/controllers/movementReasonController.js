
// movementReasonController.js

// Importamos el movementReason service
const movementReasonService = require('../services/movementReasonService');

class MovementReasonController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener todas las razones de movimiento
    async getMovementReasons(req, res, next){
        try {
            const movementReasons = await movementReasonService.getMovementReasons();
            res.json(movementReasons);
        } catch(error) {
            next(error);
        }
    }

    // Metodo para obtener una razón de movimiento por ID
    async getMovementReasonById(req, res, next){
        const { id } = req.params;

        try {
            const movementReason = await movementReasonService.getMovementReasonById(id);
            res.json(movementReason);
            
        } catch(error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Metodo para agregar una nueva razón de movimiento
    async createMovementReason(req, res, next){
        try {
            const { type, reason } = req.body;
            const newMovementReason = await movementReasonService.addMovementReason({ type, reason });
            res.status(201).json(newMovementReason);
        } catch(error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Metodo para actualizar una razón de movimiento
    async updateMovementReason(req, res, next){

        try {
            const { id } = req.params;
            const { type, reason } = req.body;
            const updatedMovementReason = await movementReasonService.modifyMovementReason(id, { type, reason });
            
            res.json(updatedMovementReason);

        } catch(error){
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Metodo para eliminar una razón de movimiento
    async deleteMovementReason(req, res, next){
        try {
            const { id } = req.params;
            await movementReasonService.removeMovementReason(id);
            res.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new MovementReasonController();
