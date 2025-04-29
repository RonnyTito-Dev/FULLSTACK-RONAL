
// saleDetailModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu SaleDetailModel 
class SaleDetailModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los detalles de ventas
    async getAllSaleDetails() {
        const result = await db.query('SELECT * FROM sale_details ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener un detalle por ID
    async getSaleDetailById(id) {
        const result = await db.query('SELECT * FROM sale_details WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener detalles por ID de venta
    async getDetailsBySaleId(sale_id) {
        const result = await db.query('SELECT * FROM sale_details WHERE sale_id = $1', [sale_id]);
        return result.rows;
    }



    // ============================= METODO POST =============================

    // Crear un nuevo detalle de venta
    async createSaleDetail({ sale_id, product_id, quantity, unit_price }) {
        const result = await db.query(
            `INSERT INTO sale_details (sale_id, product_id, quantity, unit_price)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [sale_id, product_id, quantity, unit_price]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar un detalle de venta
    async updateSaleDetail(id, { sale_id, product_id, quantity, unit_price }) {
        const result = await db.query(
            `UPDATE sale_details
             SET sale_id = $1, product_id = $2, quantity = $3, unit_price = $4
             WHERE id = $5
             RETURNING *`,
            [sale_id, product_id, quantity, unit_price, id]
        );
        return result.rows[0];
    }



    // ============================= METODO DELETE ===========================

    // Eliminar un detalle de venta
    async deleteSaleDetail(id) {
        await db.query('DELETE FROM sale_details WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase SaleDetailModel
module.exports = new SaleDetailModel();
    