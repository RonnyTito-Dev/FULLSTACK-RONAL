const db = require('../config/db'); // Importamos la DB

class ClienteModel {

    //======================================= METODOS GET =======================================

    // Metodo para obtener todos los registros
    async getAllClients(){
        const result = await db.query('SELECT * FROM clients');
        return result.rows;
    }

    // Metodo para obtener un cliente por dni
    async getClientByDNI(dni){
        const result = await db.query('SELECT * FROM clients WHERE dni = $1', [dni]);
        return result.rows[0];
    }

    // Metodo para obtener un cliente por dni
    async getClientById(id){
        const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
        return result.rows[0];
    }



    //======================================= METODO POST =======================================

    // Método para agregar un nuevo cliente
    async createClient({ dni, nombre, a_paterno, a_materno, fecha_nacimiento }) {
        const result = await db.query(
            'INSERT INTO clients (dni, nombre, a_paterno, a_materno, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dni, nombre, a_paterno, a_materno, fecha_nacimiento]
        );

        // Devolvemos el primer cliente registrado (resultado de la consulta)
        return result.rows[0];
    }



    //======================================= METODO PUT =======================================

    // Metodo para actualizar un cliente por ID
    async updateClientById(id, { dni, nombre, a_paterno, a_materno, fecha_nacimiento }) {
        const result = await db.query(
            'UPDATE clients SET dni = $1, nombre = $2, a_paterno = $3, a_materno = $4, fecha_nacimiento = $5 WHERE id = $6 RETURNING *',
            [dni, nombre, a_paterno, a_materno, fecha_nacimiento, id]
        );

        // Devolvemos el cliente actualizado
        return result.rows[0];
    }



    // Metodo para actualizar un cliente por DNI
    async updateClientByDNI(dni, { nombre, a_paterno, a_materno, fecha_nacimiento }) {
        const result = await db.query(
            'UPDATE clients SET nombre = $1, a_paterno = $2, a_materno = $3, fecha_nacimiento = $4 WHERE dni = $5 RETURNING *',
            [nombre, a_paterno, a_materno, fecha_nacimiento, dni]
        );

        // Devolvemos el cliente actualizado
        return result.rows[0];
    }





    //====================================== METODO DELETE =====================================

    // Metodo para eliminar un cliente
    async deleteClient(dni){
        await db.query('DELETE FROM clients WHERE dni = $1', [dni]);
    }

}

module.exports = new ClienteModel(); // Exportar la instancia de Cliente Model