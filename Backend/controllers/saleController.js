
// saleController.js

// Importamos el SaleService
const saleService = require('../services/saleService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class SaleController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todas las ventas
    async getAllSales(req, res, next) {
        try {
            const sales = await saleService.getAllSales();
            res.json(sales);
        } catch (error) {
            next(ApiError.internal('Error al obtener las ventas'));
        }
    }

    // Método para obtener una venta por ID
    async getSaleById(req, res, next) {
        const { id } = req.params;

        try {
            const sale = await saleService.getSaleById(id);

            if (!sale) {
                return next(ApiError.notFound('Venta no encontrada'));
            }

            res.json(sale);
        } catch (error) {
            next(ApiError.internal('Error al obtener la venta'));
        }
    }

    // Método para obtener ventas por ID de usuario
    async getSalesByUserId(req, res, next) {
        const { user_id } = req.params;

        try {
            const sales = await saleService.getSalesByUserId(user_id);

            if (!sales.length) {
                return next(ApiError.notFound('No se encontraron ventas para este usuario'));
            }

            res.json(sales);
        } catch (error) {
            next(ApiError.internal('Error al obtener las ventas del usuario'));
        }
    }

    // Método para obtener ventas por ID de cliente
    async getSalesByCustomerId(req, res, next) {
        const { customer_id } = req.params;

        try {
            const sales = await saleService.getSalesByCustomerId(customer_id);

            if (!sales.length) {
                return next(ApiError.notFound('No se encontraron ventas para este cliente'));
            }

            res.json(sales);
        } catch (error) {
            next(ApiError.internal('Error al obtener las ventas del cliente'));
        }
    }

    // Método para obtener ventas por método de pago
    async getSalesByPaymentMethod(req, res, next) {
        const { payment_method_id } = req.params;

        try {
            const sales = await saleService.getSalesByPaymentMethod(payment_method_id);

            if (!sales.length) {
                return next(ApiError.notFound('No se encontraron ventas para este método de pago'));
            }

            res.json(sales);
        } catch (error) {
            next(ApiError.internal('Error al obtener las ventas por método de pago'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar una nueva venta
    async createSale(req, res, next) {
        const { customer_id, user_id, payment_method_id, total_amount } = req.body;

        try {
            const newSale = await saleService.createSale({ customer_id, user_id, payment_method_id, total_amount });
            res.status(201).json(newSale);
        } catch (error) {
            next(ApiError.internal('Error al crear la venta'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar una venta
    async updateSale(req, res, next) {
        const { id } = req.params;
        const { customer_id, user_id, payment_method_id, total_amount } = req.body;

        try {
            const updatedSale = await saleService.updateSale(id, { customer_id, user_id, payment_method_id, total_amount });

            if (!updatedSale) {
                return next(ApiError.notFound('Venta no encontrada para actualizar'));
            }

            res.json(updatedSale);
        } catch (error) {
            next(ApiError.internal('Error al actualizar la venta'));
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
            next(ApiError.internal('Error al eliminar la venta'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new SaleController();
