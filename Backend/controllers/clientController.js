// Importamos el cliente service
const clientService = require('../services/clientService');

class ClientController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener los clientes
    async getClients(req, res){
        try {
            const clients = await clientService.getClients();
            res.json(clients);

        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los clientes' });
        }

    }

    
    // Metodo para obtener un cliente por DNI
    async getClientByDNI(req, res){
        const { dni } = req.params;

        try {
            const client = await clientService.getClientByDNI(dni);

            if(!client) {
                return res.status(404).json({ message: 'Cliente no encontrado' })
            }

            res.json(client);
            
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el cliente' });
        }
    }

    // Método para obtener un cliente por ID
    async getClientById(req, res) {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la URL

        try {
            const client = await clientService.getClientById(id); // Llamamos al servicio para obtener el cliente por ID

            // Si no se encuentra el cliente, devolvemos un error 404
            if (!client) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }

            // Devolvemos el cliente encontrado
            res.json(client);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el cliente' });
        }
    }




    // ========================================== METODO POST ==========================================

    // Metodo para agregar un cliente
    async createClient(req, res) {
        try {
            const { dni, nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;
            const newClient = await clientService.addClient({ dni, nombre, a_paterno, a_materno, fecha_nacimiento });

            res.status(201).json(newClient);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el cliente' });
        }
    }



    // ========================================== METODO PUT ==========================================

    // Método para actualizar un cliente por DNI
    async updateClientByDNI(req, res) {
        try {

            const { dni } = req.params;
            const { nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;
            const updatedClient = await clientService.modifyClientByDNI(dni, { nombre, a_paterno, a_materno, fecha_nacimiento });

            res.json(updatedClient);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el cliente' });
        }
    }

    // Método para actualizar un cliente por ID
    async updateClientById(req, res) {
        try {
            const { id } = req.params; 
            const { dni, nombre, a_paterno, a_materno, fecha_nacimiento } = req.body;

            const updatedClient = await clientService.modifyClientById(id, { dni, nombre, a_paterno, a_materno, fecha_nacimiento });

            res.json(updatedClient);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el cliente' });
        }
    }





    // ========================================== METODO DELETE ==========================================

    async deleteClient(req, res) {
        try {
            const { dni } = req.params;

            await clientService.removeClient(dni);

            res.sendStatus(204);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el cliente' });
        }
    }


}

// Exportamos la instancia de la clase
module.exports = new ClientController();