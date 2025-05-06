
// saleDetailController.js

// Importamos el SaleDetailService
const saleDetailService = require('../services/saleDetailService');

class SaleDetailController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los detalles de ventas
    async getSaleDetails(req, res, next) {
        try {
            const saleDetails = await saleDetailService.getSaleDetails();
            res.json(saleDetails);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un detalle de venta por ID
    async getSaleDetailById(req, res, next) {
        const { id } = req.params;

        try {
            const saleDetail = await saleDetailService.getSaleDetailById(id);
            res.json(saleDetail);

        } catch (error) {
            next(error);
        }
    }

    // Método para obtener detalles de venta por sale_id
    async getSaleDetailsBySaleId(req, res, next) {
        const { sale_id } = req.params;

        try {
            const saleDetails = await saleDetailService.getSaleDetailsBySaleId(sale_id);
            res.json(saleDetails);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo detalle de venta
    async createSaleDetail(req, res, next) {
        const { sale_id, product_id, quantity, unit_price } = req.body;
        

        try {
            const newSaleDetail = await saleDetailService.addSaleDetail({ sale_id, product_id, quantity, unit_price });
            res.status(201).json(newSaleDetail);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un detalle de venta
    async updateSaleDetail(req, res, next) {
        const { id } = req.params;
        const { sale_id, product_id, quantity, unit_price } = req.body;

        try {
            const updatedSaleDetail = await saleDetailService.modifySaleDetail(id, { sale_id, product_id, quantity, unit_price });

            res.json(updatedSaleDetail);

        } catch (error) {
            next(error);
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
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new SaleDetailController();
