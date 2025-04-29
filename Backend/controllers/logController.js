
// logController.js

// Importamos el LogService
const logService = require('../services/logService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class LogController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los logs
    async getLogs(req, res, next) {
        try {
            const logs = await logService.getLogs();
            res.json(logs);
        } catch (error) {
            next(ApiError.internal('Error al obtener los logs'));
        }
    }

    // Método para obtener un log por ID
    async getLogById(req, res, next) {
        const { id } = req.params;

        try {
            const log = await logService.getLogById(id);

            if (!log) {
                return next(ApiError.notFound('Log no encontrado'));
            }

            res.json(log);

        } catch (error) {
            next(ApiError.internal('Error al obtener el log'));
        }
    }

    // Método para obtener logs por usuario
    async getLogsByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const logs = await logService.getLogsByUserId(user_id);

            if (logs.length === 0) {
                return next(ApiError.notFound('No se encontraron logs para este usuario'));
            }

            res.json(logs);

        } catch (error) {
            next(ApiError.internal('Error al obtener los logs del usuario'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo log
    async createLog(req, res, next) {
        const { message, user_id, action } = req.body;

        try {
            const newLog = await logService.addLog({ message, user_id, action });
            res.status(201).json(newLog);
        } catch (error) {
            next(ApiError.internal('Error al crear el log'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new LogController();
