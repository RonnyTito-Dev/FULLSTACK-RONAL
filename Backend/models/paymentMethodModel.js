
// paymentMethodModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu PaymentMethodModel 
class PaymentMethodModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los métodos de pago
    async getAllPaymentMethods() {
        const result = await db.query('SELECT * FROM payment_methods ORDER BY created_at DESC');
        return result.rows;
    }

    // Obtener un método de pago por ID
    async getPaymentMethodById(id) {
        const result = await db.query('SELECT * FROM payment_methods WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener un método de pago por Nombre
    async getPaymentMethodByName(name) {
        const result = await db.query('SELECT * FROM payment_methods WHERE name = $1', [name]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear un nuevo método de pago
    async createPaymentMethod({ name, description }) {
        const result = await db.query(
            `INSERT INTO payment_methods (name, description)
             VALUES ($1, $2)
             RETURNING *`,
            [name, description]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar un método de pago
    async updatePaymentMethod(id, { name, description }) {
        const result = await db.query(
            `UPDATE payment_methods
             SET name = $1, description = $2
             WHERE id = $3
             RETURNING *`,
            [name, description, id]
        );
        return result.rows[0];
    }



    // ============================= METODO DELETE ===========================

    // Eliminar un método de pago
    async deletePaymentMethod(id) {
        await db.query('DELETE FROM payment_methods WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase PaymentMethodModel
module.exports = new PaymentMethodModel();
    