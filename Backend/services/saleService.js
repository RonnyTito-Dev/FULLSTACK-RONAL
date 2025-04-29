
// saleService.js

// Importamos el Sale Model
const saleModel = require('../models/saleModel');

class SaleService {

    // Metodo para obtener todas las ventas
    async getAllSales() {
        return await saleModel.getAllSales();
    }

    // Metodo para obtener una venta por ID
    async getSaleById(id) {
        return await saleModel.getSaleById(id);
    }

    // Metodo para obtener ventas por ID de usuario
    async getSalesByUserId(user_id) {
        return await saleModel.getSalesByUserId(user_id);
    }

    // Metodo para obtener ventas por ID de cliente
    async getSalesByCustomerId(customer_id) {
        return await saleModel.getSalesByCustomerId(customer_id);
    }

    // Metodo para obtener ventas por método de pago
    async getSalesByPaymentMethod(payment_method_id) {
        return await saleModel.getSalesByPaymentMethod(payment_method_id);
    }

    // Metodo para agregar una nueva venta
    async createSale(data) {
        return await saleModel.createSale(data);
    }

    // Metodo para actualizar una venta
    async updateSale(id, data) {
        return await saleModel.updateSale(id, data);
    }

    // Metodo para eliminar una venta
    async deleteSale(id) {
        await saleModel.deleteSale(id);
    }

}

// Exportamos una instancia de SaleService
module.exports = new SaleService();
    