
// customerModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu CustomerModel 
class CustomerModel {

    // ============================= METODOS GET ==============================

    // Obtener todos los clientes
    async getAllCustomers() {
        const result = await db.query('SELECT * FROM customers');
        return result.rows;
    }

    // Obtener un cliente por ID
    async getCustomerById(id) {
        const result = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear un nuevo cliente
    async createCustomer({ name, dni, email, phone, address, date_of_birth }) {
        const result = await db.query(
            `INSERT INTO customers (name, dni, email, phone, address, date_of_birth)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name, dni, email, phone, address, date_of_birth]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar un cliente existente
    async updateCustomer(id, { name, dni, email, phone, address, date_of_birth }) {
        const result = await db.query(
            `UPDATE customers
             SET name = $1, dni = $2, email = $3, phone = $4, address = $5, date_of_birth = $6
             WHERE id = $7
             RETURNING *`,
            [name, dni, email, phone, address, date_of_birth, id]
        );
        return result.rows[0];
    }



    // ============================ METODO DELETE ============================

    // Eliminar un cliente
    async deleteCustomer(id) {
        await db.query('DELETE FROM customers WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase CustomerModel
module.exports = new CustomerModel();
    