
// logService.js

// Importamos el Log Model
const logModel = require('../models/logModel');

class LogService {

    // Metodo para obtener todos los logs
    async getLogs() {
        return await logModel.getAllLogs();
    }

    // Metodo para obtener un log por ID
    async getLogById(id) {
        return await logModel.getLogById(id);
    }

    // Metodo para obtener logs por usuario
    async getLogsByUserId(user_id) {
        return await logModel.getLogsByUserId(user_id);
    }

    // Metodo para agregar un nuevo log
    async addLog(data) {
        return await logModel.createLog(data);
    }

}

// Exportamos una instancia de LogService
module.exports = new LogService();
    