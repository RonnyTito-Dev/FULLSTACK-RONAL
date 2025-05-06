
// saleDetailService.js

// Importamos el SaleDetail Model
const saleDetailModel = require('../models/saleDetailModel');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class SaleDetailService {

    // Metodo para obtener todos los detalles de ventas
    async getSaleDetails() {
        const saleDetails = await saleDetailModel.getAllSaleDetails();
        if (!saleDetails || saleDetails.length === 0) {
            throw ApiError.notFound('No se encontraron detalles de ventas');
        }
        return saleDetails;
    }


    // Metodo para obtener un detalle de venta por ID
    async getSaleDetailById(id) {
        const saleDetail = await saleDetailModel.getSaleDetailById(id);
        if (!saleDetail) {
            throw ApiError.notFound(`Detalle de venta con ID ${id} no encontrado`);
        }
        return saleDetail;
    }


    // Metodo para obtener detalles de venta por sale_id
    async getSaleDetailsBySaleId(sale_id) {
        const saleDetails = await saleDetailModel.getDetailsBySaleId(sale_id);
        if (!saleDetails || saleDetails.length === 0) {
            throw ApiError.notFound('No se encontraron detalles de venta para esta venta');
        }
        return saleDetails;
    }


    // Metodo para agregar un nuevo detalle de venta
    async addSaleDetail(data) {
        
        if (!data.sale_id || !data.product_id || !data.quantity || !data.unit_price) {
            throw ApiError.badRequest('Sale ID, Product ID, Quantity y Unit Price son requeridos');
        }
        return await saleDetailModel.createSaleDetail(data);
    }
    

    // Metodo para editar un detalle de venta
    async modifySaleDetail(id, data) {
        if (!data.sale_id || !data.product_id || !data.quantity || !data.unit_price) {
            throw ApiError.badRequest('Sale ID, Product ID, Quantity y Unit Price son requeridos');
        }

        const existing = await saleDetailModel.getSaleDetailById(id);
        if (!existing) {
            throw ApiError.notFound(`Detalle de venta con ID ${id} no encontrado`);
        }

        return await saleDetailModel.updateSaleDetail(id, data);
    }

    
    // Metodo para eliminar un detalle de venta
    async removeSaleDetail(id) {
        const existing = await saleDetailModel.getSaleDetailById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró el detalle de venta con ID ${id}`);
        }

        await saleDetailModel.deleteSaleDetail(id);
    }

}

// Exportamos una instancia de SaleDetailService
module.exports = new SaleDetailService();
    