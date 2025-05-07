
// paymentMethodService.js

// Importamos el PaymentMethod Model
const paymentMethodModel = require('../models/paymentMethodModel');

// Importamos el handdle error
const ApiError = require('../errors/apiError');

class PaymentMethodService {

    // Metodo para obtener todos los métodos de pago
    async getPaymentMethods() {
        const methods = await paymentMethodModel.getAllPaymentMethods();
        if (!methods || methods.length === 0) {
            throw ApiError.notFound('No hay métodos de pago disponibles');
        }
        return methods;
    }

    // Metodo para obtener un método de pago por ID
    async getPaymentMethodById(id) {
        const method = await paymentMethodModel.getPaymentMethodById(id);
        if (!method) {
            throw ApiError.notFound(`Método de pago con ID ${id} no encontrado`);
        }
        return method;
    }

    // Metodo para agregar un nuevo método de pago
    async addPaymentMethod(data) {
        if (!data.name) {
            throw ApiError.badRequest('El nombre del método de pago es requerido');
        }

        const existingName = await paymentMethodModel.getPaymentMethodByName(data.name);

        if(existingName){
            throw ApiError.conflict(`El nombre ${data.name} ya existe`)
        }

        return await paymentMethodModel.createPaymentMethod(data);
    }

    // Metodo para editar un método de pago
    async modifyPaymentMethod(id, data) {
        if (!data.name) {
            throw ApiError.badRequest('El nombre del método de pago es obligatorio');
        }
    
        const existing = await paymentMethodModel.getPaymentMethodById(id);
        if (!existing) {
            throw ApiError.notFound(`Método de pago con ID ${id} no existe`);
        }
    
        // Validar duplicado solo si el nombre fue modificado
        if (data.name.trim() !== existing.name) {
            const existingName = await paymentMethodModel.getPaymentMethodByName(data.name.trim());
            if (existingName) {
                throw ApiError.conflict(`El nombre ${data.name} ya existe`);
            }
        }
    
        return await paymentMethodModel.updatePaymentMethod(id, data);
    }
    

    // Metodo para eliminar un método de pago
    async removePaymentMethod(id) {
        const existing = await paymentMethodModel.getPaymentMethodById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró el método de pago con ID ${id}`);
        }

        await paymentMethodModel.deletePaymentMethod(id);
    }

}

// Exportamos una instancia de PaymentMethodService
module.exports = new PaymentMethodService();
    