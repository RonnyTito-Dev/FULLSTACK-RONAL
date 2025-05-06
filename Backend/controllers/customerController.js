
// customerController.js

// Importamos el CustomerService
const customerService = require('../services/customerService');

class CustomerController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los clientes
    async getCustomers(req, res, next) {
        try {
            const customers = await customerService.getCustomers();
            res.json(customers);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un cliente por ID
    async getCustomerById(req, res, next) {
        const { id } = req.params;

        try {
            const customer = await customerService.getCustomerById(id);
            res.json(customer);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo cliente
    async createCustomer(req, res, next) {
        const { name, dni, email, phone, address, date_of_birth } = req.body;

        try {
            const newCustomer = await customerService.addCustomer({ name, dni, email, phone, address, date_of_birth });
            res.status(201).json(newCustomer);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un cliente
    async updateCustomer(req, res, next) {
        const { id } = req.params;
        const { name, dni, email, phone, address, date_of_birth } = req.body;

        try {
            const updatedCustomer = await customerService.modifyCustomer(id, { name, dni, email, phone, address, date_of_birth });

            res.json(updatedCustomer);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar un cliente
    async deleteCustomer(req, res, next) {
        const { id } = req.params;

        try {
            await customerService.removeCustomer(id);
            res.sendStatus(204); // Sin contenido
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new CustomerController();
