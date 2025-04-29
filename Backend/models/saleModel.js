
// saleModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu SaleModel 
class SaleModel {

    // ============================= METODOS GET ==============================

    // Obtener todas las ventas
    async getAllSales() {
        const result = await db.query('SELECT * FROM sales ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener una venta por ID
    async getSaleById(id) {
        const result = await db.query('SELECT * FROM sales WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener ventas por ID de usuario
    async getSalesByUserId(user_id) {
        const result = await db.query('SELECT * FROM sales WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        return result.rows;
    }

    // Obtener ventas por ID de cliente
    async getSalesByCustomerId(customer_id) {
        const result = await db.query('SELECT * FROM sales WHERE customer_id = $1 ORDER BY created_at DESC', [customer_id]);
        return result.rows;
    }

    // Obtener ventas por método de pago
    async getSalesByPaymentMethod(payment_method_id) {
        const result = await db.query('SELECT * FROM sales WHERE payment_method_id = $1 ORDER BY created_at DESC', [payment_method_id]);
        return result.rows;
    }



    // ============================= METODO POST =============================

    // Crear una nueva venta
    async createSale({ user_id, customer_id, payment_method_id, total }) {
        const result = await db.query(
            `INSERT INTO sales (user_id, customer_id, payment_method_id, total)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user_id, customer_id, payment_method_id, total]
        );
        return result.rows[0];
    }

    // ============================= METODO PUT ==============================

    // Actualizar una venta
    async updateSale(id, { user_id, customer_id, payment_method_id, total }) {
        const result = await db.query(
            `UPDATE sales
             SET user_id = $1, customer_id = $2, payment_method_id = $3, total = $4
             WHERE id = $5
             RETURNING *`,
            [user_id, customer_id, payment_method_id, total, id]
        );
        return result.rows[0];
    }

    // ============================= METODO DELETE ===========================

    // Eliminar una venta
    async deleteSale(id) {
        await db.query('DELETE FROM sales WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase SaleModel
module.exports = new SaleModel();
    