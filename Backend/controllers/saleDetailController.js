
// saleDetailController.js

// Importamos el SaleDetailService
const saleDetailService = require('../services/saleDetailService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class SaleDetailController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los detalles de ventas
    async getSaleDetails(req, res, next) {
        try {
            const saleDetails = await saleDetailService.getSaleDetails();
            res.json(saleDetails);
        } catch (error) {
            next(ApiError.internal('Error al obtener los detalles de ventas'));
        }
    }

    // Método para obtener un detalle de venta por ID
    async getSaleDetailById(req, res, next) {
        const { id } = req.params;

        try {
            const saleDetail = await saleDetailService.getSaleDetailById(id);

            if (!saleDetail) {
                return next(ApiError.notFound('Detalle de venta no encontrado'));
            }

            res.json(saleDetail);

        } catch (error) {
            next(ApiError.internal('Error al obtener el detalle de venta'));
        }
    }

    // Método para obtener detalles de venta por sale_id
    async getSaleDetailsBySaleId(req, res, next) {
        const { sale_id } = req.params;

        try {
            const saleDetails = await saleDetailService.getSaleDetailsBySaleId(sale_id);

            if (!saleDetails.length) {
                return next(ApiError.notFound('No se encontraron detalles de venta para esta venta'));
            }

            res.json(saleDetails);

        } catch (error) {
            next(ApiError.internal('Error al obtener los detalles de venta'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo detalle de venta
    async createSaleDetail(req, res, next) {
        const { sale_id, product_id, quantity, price } = req.body;

        try {
            const newSaleDetail = await saleDetailService.addSaleDetail({ sale_id, product_id, quantity, price });
            res.status(201).json(newSaleDetail);
        } catch (error) {
            next(ApiError.internal('Error al crear el detalle de venta'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un detalle de venta
    async updateSaleDetail(req, res, next) {
        const { id } = req.params;
        const { sale_id, product_id, quantity, price } = req.body;

        try {
            const updatedSaleDetail = await saleDetailService.modifySaleDetail(id, { sale_id, product_id, quantity, price });

            if (!updatedSaleDetail) {
                return next(ApiError.notFound('Detalle de venta no encontrado para actualizar'));
            }

            res.json(updatedSaleDetail);

        } catch (error) {
            next(ApiError.internal('Error al actualizar el detalle de venta'));
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar un detalle de venta
    async deleteSaleDetail(req, res, next) {
        const { id } = req.params;

        try {
            await saleDetailService.removeSaleDetail(id);
            res.sendStatus(204);
        } catch (error) {
            next(ApiError.internal('Error al eliminar el detalle de venta'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new SaleDetailController();
