
// customerService.js

// Importamos el Customer Model
const customerModel = require('../models/customerModel');

class CustomerService {

    // Metodo para obtener todos los Customers
    async getCustomers(){
        return await customerModel.getAllCustomers();
    }


    // Metodo para obtner un Customer por id
    async getCustomerById(id){
        return await customerModel.getCustomerById(id);
    }

    // Metodo para agregar un Customer
    async addCustomer(data){
        return await customerModel.createCustomer(data);
    }

    // Metodo para editar un Customer
    async modifyCustomer(id, data){
        return await customerModel.updateCustomer(id, data);
    }

    // Metodo para eliminar un Customer
    async removeCustomer(id){
        await customerModel.deleteCustomer(id);
    }

}

// Exportamos una instancia de CustomerService
module.exports = new CustomerService();
    