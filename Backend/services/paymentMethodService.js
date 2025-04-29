
// paymentMethodService.js

// Importamos el PaymentMethod Model
const paymentMethodModel = require('../models/paymentMethodModel');

class PaymentMethodService {

    // Metodo para obtener todos los métodos de pago
    async getPaymentMethods() {
        return await paymentMethodModel.getAllPaymentMethods();
    }

    // Metodo para obtener un método de pago por ID
    async getPaymentMethodById(id) {
        return await paymentMethodModel.getPaymentMethodById(id);
    }

    // Metodo para agregar un nuevo método de pago
    async addPaymentMethod(data) {
        return await paymentMethodModel.createPaymentMethod(data);
    }

    // Metodo para editar un método de pago
    async modifyPaymentMethod(id, data) {
        return await paymentMethodModel.updatePaymentMethod(id, data);
    }

    // Metodo para eliminar un método de pago
    async removePaymentMethod(id) {
        await paymentMethodModel.deletePaymentMethod(id);
    }

}

// Exportamos una instancia de PaymentMethodService
module.exports = new PaymentMethodService();
    