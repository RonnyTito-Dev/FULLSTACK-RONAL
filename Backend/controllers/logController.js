
// logController.js

// Importamos el LogService
const logService = require('../services/logService');


class LogController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los logs
    async getLogs(req, res, next) {
        try {
            const logs = await logService.getLogs();
            res.json(logs);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un log por ID
    async getLogById(req, res, next) {
        const { id } = req.params;

        try {
            const log = await logService.getLogById(id);
            res.json(log);

        } catch (error) {
            next(error);
        }
    }

    // Método para obtener logs por usuario
    async getLogsByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const logs = await logService.getLogsByUserId(user_id);
            res.json(logs);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo log
    async createLog(req, res, next) {
        const { user_id, action, affected_table } = req.body;

        try {
            const newLog = await logService.addLog({ user_id, action, affected_table });
            res.status(201).json(newLog);
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new LogController();
