
// customerService.js

// Importamos el Customer Model
const customerModel = require('../models/customerModel');

// Importamos manejador de errores
const ApiError = require('../errors/apiError');

class CustomerService {

    // Metodo para obtener todos los Customers
    async getCustomers(){
        const customers = await customerModel.getAllCustomers();
        if (!customers || customers.length === 0) {
            throw ApiError.notFound('No hay clientes registrados');
        }
        return customers;
    }


    // Metodo para obtner un Customer por id
    async getCustomerById(id){
        const customer = await customerModel.getCustomerById(id);
        if (!customer) {
            throw ApiError.notFound(`Cliente con ID ${id} no encontrado`);
        }
        return customer;
    }

    // Metodo para agregar un Customer
    async addCustomer(data){
        const { name, dni, email } = data;

        if (!name || !dni || !email) {
            throw ApiError.badRequest('Nombre, dni y email son requeridos');
        }

        const existingDNI = await customerModel.getCustomerByDNI(dni.trim())
        if(existingDNI){
            throw ApiError.conflict(`El DNI ${dni} ya existe.`)
        }

        const existingEmail = await customerModel.getCustomerByEmail(email.trim())
        if(existingEmail){
            throw ApiError.conflict(`El Email ${email} ya existe.`)
        }

        return await customerModel.createCustomer(data);
    }

    // Metodo para editar un Customer
    async modifyCustomer(id, data){

        const { name, dni, email } = data;

        if (!name || !dni || !email) {
            throw ApiError.badRequest('Nombre, dni y email son requeridos');
        }

        const existing = await customerModel.getCustomerById(id);
        if (!existing) {
            throw ApiError.notFound(`Cliente con ID ${id} no encontrado`);
        }

        // Verifica si otro cliente tiene el mismo DNI
        const customerWithDNI = await customerModel.getCustomerByDNI(dni.trim());
        if (customerWithDNI && Number(customerWithDNI.id) !== Number(id)) {
            throw ApiError.conflict(`El DNI ${dni} ya existe.`);
        }

        // Verifica si otro cliente tiene el mismo email
        const customerWithEmail = await customerModel.getCustomerByEmail(email.trim());
        if (customerWithEmail && Number(customerWithEmail.id) !== Number(id)) {
            throw ApiError.conflict(`El Email ${email} ya existe.`);
        }

        return await customerModel.updateCustomer(id, data);
    }

    // Metodo para eliminar un Customer
    async removeCustomer(id){
        const existing = await customerModel.getCustomerById(id);
        if (!existing) {
            throw ApiError.notFound(`Cliente con ID ${id} no encontrado`);
        }

        await customerModel.deleteCustomer(id);
    }

}

// Exportamos una instancia de CustomerService
module.exports = new CustomerService();
    