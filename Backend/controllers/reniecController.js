
// reniecController.js

// Importamos el reniec service
const reniecService = require('../services/reniecService');

class ReniecController {
    
    // Metodo para consultar datos por DNI
    async getByDni(req, res, next) {
        const { dni } = req.params;

        try {
            const data = await reniecService.getReniecDataByDni(dni);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReniecController();
