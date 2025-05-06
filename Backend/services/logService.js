
// logService.js

// Importamos el Log Model
const logModel = require('../models/logModel');

// Importamos manejador de errores
const ApiError = require('../errors/apiError');

class LogService {

    // Metodo para obtener todos los logs
    async getLogs() {
        const logs = await logModel.getAllLogs();
        if (!logs || logs.length === 0) {
            throw ApiError.notFound('No se encontraron logs disponibles');
        }
        return logs;
    }

    // Metodo para obtener un log por ID
    async getLogById(id) {
        const log = await logModel.getLogById(id);
        if (!log) {
            throw ApiError.notFound(`Log con ID ${id} no encontrado`);
        }
        return log;
    }

    // Metodo para obtener logs por usuario
    async getLogsByUserId(user_id) {
        const logs = await logModel.getLogsByUserId(user_id);
        if (!logs || logs.length === 0) {
            throw ApiError.notFound(`No se encontraron logs para el usuario con ID ${user_id}`);
        }
        return logs;
    }

    // Metodo para agregar un nuevo log
    async addLog(data) {
        if (!data.user_id || !data.action || !data.affected_table) {
            throw ApiError.badRequest('id Usuario, accion y tabla afectadada son requeridos para agregar el log');
        }

        const newLog = await logModel.createLog(data);
        if (!newLog) {
            throw ApiError.internal('Error al crear el log');
        }

        return newLog;
    }

}

// Exportamos una instancia de LogService
module.exports = new LogService();
    