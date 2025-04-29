
// customerController.js
// Importamos el CustomerService
const customerService = require('../services/customerService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class CustomerController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los clientes
    async getCustomers(req, res, next) {
        try {
            const customers = await customerService.getCustomers();
            res.json(customers);
        } catch (error) {
            next(ApiError.internal('Error al obtener los clientes'));
        }
    }

    // Método para obtener un cliente por ID
    async getCustomerById(req, res, next) {
        const { id } = req.params;

        try {
            const customer = await customerService.getCustomerById(id);

            if (!customer) {
                return next(ApiError.notFound('Cliente no encontrado'));
            }

            res.json(customer);

        } catch (error) {
            next(ApiError.internal('Error al obtener el cliente'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo cliente
    async createCustomer(req, res, next) {
        const { name, email, phone } = req.body;

        try {
            const newCustomer = await customerService.addCustomer({ name, email, phone });
            res.status(201).json(newCustomer);
        } catch (error) {
            next(ApiError.internal('Error al crear el cliente'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un cliente
    async updateCustomer(req, res, next) {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        try {
            const updatedCustomer = await customerService.modifyCustomer(id, { name, email, phone });

            if (!updatedCustomer) {
                return next(ApiError.notFound('Cliente no encontrado para actualizar'));
            }

            res.json(updatedCustomer);

        } catch (error) {
            next(ApiError.internal('Error al actualizar el cliente'));
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
            next(ApiError.internal('Error al eliminar el cliente'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new CustomerController();
