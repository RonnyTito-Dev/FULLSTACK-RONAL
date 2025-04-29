
// paymentMethodController.js

// Importamos el PaymentMethodService
const paymentMethodService = require('../services/paymentMethodService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class PaymentMethodController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los métodos de pago
    async getPaymentMethods(req, res, next) {
        try {
            const paymentMethods = await paymentMethodService.getPaymentMethods();
            res.json(paymentMethods);
        } catch (error) {
            next(ApiError.internal('Error al obtener los métodos de pago'));
        }
    }

    // Método para obtener un método de pago por ID
    async getPaymentMethodById(req, res, next) {
        const { id } = req.params;

        try {
            const paymentMethod = await paymentMethodService.getPaymentMethodById(id);

            if (!paymentMethod) {
                return next(ApiError.notFound('Método de pago no encontrado'));
            }

            res.json(paymentMethod);

        } catch (error) {
            next(ApiError.internal('Error al obtener el método de pago'));
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
            next(ApiError.internal('Error al crear el método de pago'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un método de pago
    async updatePaymentMethod(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const updatedPaymentMethod = await paymentMethodService.modifyPaymentMethod(id, { name, description });

            if (!updatedPaymentMethod) {
                return next(ApiError.notFound('Método de pago no encontrado para actualizar'));
            }

            res.json(updatedPaymentMethod);

        } catch (error) {
            next(ApiError.internal('Error al actualizar el método de pago'));
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
            next(ApiError.internal('Error al eliminar el método de pago'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new PaymentMethodController();

    