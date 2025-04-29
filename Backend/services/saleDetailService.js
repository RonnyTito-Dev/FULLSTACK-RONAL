
// saleDetailService.js

// Importamos el SaleDetail Model
const saleDetailModel = require('../models/saleDetailModel');

class SaleDetailService {

    // Metodo para obtener todos los detalles de ventas
    async getSaleDetails() {
        return await saleDetailModel.getAllSaleDetails();
    }

    // Metodo para obtener un detalle de venta por ID
    async getSaleDetailById(id) {
        return await saleDetailModel.getSaleDetailById(id);
    }

    // Metodo para obtener detalles de venta por sale_id
    async getSaleDetailsBySaleId(sale_id) {
        return await saleDetailModel.getDetailsBySaleId(sale_id);
    }

    // Metodo para agregar un nuevo detalle de venta
    async addSaleDetail(data) {
        return await saleDetailModel.createSaleDetail(data);
    }

    // Metodo para editar un detalle de venta
    async modifySaleDetail(id, data) {
        return await saleDetailModel.updateSaleDetail(id, data);
    }

    // Metodo para eliminar un detalle de venta
    async removeSaleDetail(id) {
        await saleDetailModel.deleteSaleDetail(id);
    }

}

// Exportamos una instancia de SaleDetailService
module.exports = new SaleDetailService();
    