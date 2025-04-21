// Importamos el cliente service
const clientService = require('../services/clientService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class ClientController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener los clientes
    async getClients(req, res, next){
        try {
            const clients = await clientService.getClients();
            res.json(clients);

        } catch(error) {
            next(ApiError.internal('Error al obtener los clientes'));
        }

    }

    
    // Metodo para obtener un cliente por DNI
    async getClientByDNI(req, res, next){
        const { dni } = req.params;

        try {
            const client = await clientService.getClientByDNI(dni);

            if(!client) {
                return next(ApiError.notFound('Cliente no encontrado'));
            }

            res.json(client);
            
        } catch(error){
            next(ApiError.internal('Error al obtener el cliente'));
        }
    }

    // Método para obtener un cliente por ID
    async getClientById(req, res, next) {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la URL

        try {
            const client = await clientService.getClientById(id); // Llamamos al servicio para obtener el cliente por ID

            // Si no se encuentra el cliente, devolvemos un error 404
            if (!client) {
                return next(ApiError.notFound('Cliente no encontrado'));
            }

            // Devolvemos el cliente encontrado
            res.json(client);

        } catch (error) {
            next(ApiError.internal('Error al obtener el cliente'));
        }
    }




    // ========================================== METODO POST ==========================================

    // Metodo para agregar un cliente
    async createClient(req, res, next) {
        try {
            const { dni, nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;
            const newClient = await clientService.addClient({ dni, nombre, a_paterno, a_materno, fecha_nacimiento });

            res.status(201).json(newClient);

        } catch (error) {
            next(ApiError.internal('Error al crear el cliente'));
        }
    }



    // ========================================== METODO PUT ==========================================

    // Método para actualizar un cliente por DNI
    async updateClientByDNI(req, res, next) {
        try {

            const { dni } = req.params;
            const { nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;
            const updatedClient = await clientService.modifyClientByDNI(dni, { nombre, a_paterno, a_materno, fecha_nacimiento });

            if (!updatedClient) {
                return next(ApiError.notFound('Cliente no encontrado para actualizar'));
            }

            res.json(updatedClient);

        } catch (error) {
            console.error(error);
            next(ApiError.internal('Error al actualizar el cliente'));
        }
    }

    // Método para actualizar un cliente por ID
    async updateClientById(req, res, next) {
        try {
            const { id } = req.params; 
            const { dni, nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;

            const updatedClient = await clientService.modifyClientById(id, { dni, nombre, a_paterno, a_materno, fecha_nacimiento });

            if (!updatedClient) {
                return next(ApiError.notFound('Cliente no encontrado para actualizar'));
            }

            res.json(updatedClient);

        } catch (error) {
            next(ApiError.internal('Error al actualizar el cliente'));
        }
    }





    // ========================================== METODO DELETE ==========================================

    async deleteClient(req, res, next) {
        try {
            const { dni } = req.params;

            await clientService.removeClient(dni);

            res.sendStatus(204);
            
        } catch (error) {
            next(ApiError.internal('Error al eliminar el cliente'));
        }
    }


}

// Exportamos la instancia de la clase
module.exports = new ClientController();