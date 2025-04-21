// Importamos el product model
const clienteModel = require('../models/clientModel');

class ClienteService {
    
    // Metodo para obtner todos los clientes
    async getClients(){
        return await clienteModel.getAllClients();
    }

    // Metodo para obtner un cliente por DNI
    async getClientByDNI(dni){
        return await clienteModel.getClientByDNI(dni);
    }

    // Metodo para obtner un cliente por DNI
    async getClientById(id){
        return await clienteModel.getClientById(id);
    }

    // Metodo para agregar un cliente
    async addClient(data){
        return await clienteModel.createClient(data);
    }

    // Metodo para editar un cliente por dni
    async modifyClientByDNI(dni, data){
        return await clienteModel.updateClientByDNI(dni, data);
    }


    // Metodo para editar un cliente por dni
    async modifyClientById(id, data){
        return await clienteModel.updateClientById(id, data);
    }


    // Metodo para eliminar un cliente
    async removeClient(dni){
        await clienteModel.deleteClient(dni);
    }
}


module.exports = new ClienteService();