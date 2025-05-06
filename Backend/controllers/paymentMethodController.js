
// paymentMethodController.js

// Importamos el PaymentMethodService
const paymentMethodService = require('../services/paymentMethodService');

class PaymentMethodController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los métodos de pago
    async getPaymentMethods(req, res, next) {
        try {
            const paymentMethods = await paymentMethodService.getPaymentMethods();
            res.json(paymentMethods);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un método de pago por ID
    async getPaymentMethodById(req, res, next) {
        const { id } = req.params;

        try {
            const paymentMethod = await paymentMethodService.getPaymentMethodById(id);
            res.json(paymentMethod);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo método de pago
    async createPaymentMethod(req, res, next) {
        const { name, description } = req.body;

        try {
            const newPaymentMethod = await paymentMethodService.addPaymentMethod({ name, description });
            res.status(201).json(newPaymentMethod);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un método de pago
    async updatePaymentMethod(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const updatedPaymentMethod = await paymentMethodService.modifyPaymentMethod(id, { name, description });
            res.json(updatedPaymentMethod);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar un método de pago
    async deletePaymentMethod(req, res, next) {
        const { id } = req.params;

        try {
            await paymentMethodService.removePaymentMethod(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new PaymentMethodController();

    