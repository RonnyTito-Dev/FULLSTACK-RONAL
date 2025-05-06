
// saleController.js

// Importamos el SaleService
const saleService = require('../services/saleService');

class SaleController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todas las ventas
    async getAllSales(req, res, next) {
        try {
            const sales = await saleService.getAllSales();
            res.json(sales);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener una venta por ID
    async getSaleById(req, res, next) {
        const { id } = req.params;

        try {
            const sale = await saleService.getSaleById(id);
            res.json(sale);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener ventas por ID de usuario
    async getSalesByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const sales = await saleService.getSalesByUserId(user_id);
            res.json(sales);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener ventas por ID de cliente
    async getSalesByCustomerId(req, res, next) {
        const { customer_id } = req.params;

        try {
            const sales = await saleService.getSalesByCustomerId(customer_id);
            res.json(sales);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener ventas por método de pago
    async getSalesByPaymentMethod(req, res, next) {
        const { payment_method_id } = req.params;

        try {
            const sales = await saleService.getSalesByPaymentMethod(payment_method_id);
            res.json(sales);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar una nueva venta
    async createSale(req, res, next) {
        const { user_id, customer_id, payment_method_id, total } = req.body;

        try {
            const newSale = await saleService.createSale({ user_id, customer_id, payment_method_id, total });
            res.status(201).json(newSale);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar una venta
    async updateSale(req, res, next) {
        const { id } = req.params;
        const { user_id, customer_id, payment_method_id, total } = req.body;

        try {
            const updatedSale = await saleService.updateSale(id, { user_id, customer_id, payment_method_id, total });

            res.json(updatedSale);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar una venta
    async deleteSale(req, res, next) {
        const { id } = req.params;

        try {
            await saleService.deleteSale(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new SaleController();
