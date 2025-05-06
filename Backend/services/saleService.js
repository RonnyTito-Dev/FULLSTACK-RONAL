
// saleService.js

// Importamos el Sale Model
const saleModel = require('../models/saleModel');

const ApiError = require('../errors/apiError');

class SaleService {

    // Metodo para obtener todas las ventas
    async getAllSales() {
        const sales = await saleModel.getAllSales();
        if (!sales || sales.length === 0) {
            throw ApiError.notFound('No hay ventas registradas');
        }
        return sales;
    }

    // Metodo para obtener una venta por ID
    async getSaleById(id) {
        const sale = await saleModel.getSaleById(id);
        if (!sale) {
            throw ApiError.notFound(`Venta con ID ${id} no encontrada`);
        }
        return sale;
    }

    // Metodo para obtener ventas por ID de usuario
    async getSalesByUserId(user_id) {
        const sales = await saleModel.getSalesByUserId(user_id);
        if (!sales || sales.length === 0) {
            throw ApiError.notFound(`No se encontraron ventas para el usuario con ID ${user_id}`);
        }
        return sales;
    }

    // Metodo para obtener ventas por ID de cliente
    async getSalesByCustomerId(customer_id) {
        const sales = await saleModel.getSalesByCustomerId(customer_id);
        if (!sales || sales.length === 0) {
            throw ApiError.notFound(`No se encontraron ventas para el cliente con ID ${customer_id}`);
        }
        return sales;
    }

    // Metodo para obtener ventas por método de pago
    async getSalesByPaymentMethod(payment_method_id) {
        const sales = await saleModel.getSalesByPaymentMethod(payment_method_id);
        if (!sales || sales.length === 0) {
            throw ApiError.notFound(`No se encontraron ventas para el método de pago con ID ${payment_method_id}`);
        }
        return sales;
    }

    // Metodo para agregar una nueva venta
    async createSale(data) {
        const { user_id, customer_id, payment_method_id, total } = data;

        if (!user_id || !customer_id || !payment_method_id || total == null) {
            throw ApiError.badRequest('Todos los campos son obligatorios');
        }

        return await saleModel.createSale(data);
    }

    // Metodo para actualizar una venta
    async updateSale(id, data) {

        const { user_id, customer_id, payment_method_id, total } = data;

        if (!user_id || !customer_id || !payment_method_id || total == null) {
            throw ApiError.badRequest('Todos los campos son obligatorios');
        }

        const existing = await saleModel.getSaleById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró la venta con ID ${id} para actualizar`);
        }

        return await saleModel.updateSale(id, data);
    }

    // Metodo para eliminar una venta
    async deleteSale(id) {
        const existing = await saleModel.getSaleById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró la venta con ID ${id} para eliminar`);
        }

        await saleModel.deleteSale(id);
    }

}

// Exportamos una instancia de SaleService
module.exports = new SaleService();
    