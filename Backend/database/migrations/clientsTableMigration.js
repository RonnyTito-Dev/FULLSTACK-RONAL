
// clientsTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class ClientsTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE clients (
                    id SERIAL PRIMARY KEY,
                    dni VARCHAR(8) UNIQUE,
                    nombre VARCHAR(50) NOT NULL,
                    a_paterno VARCHAR(50) NOT NULL,
                    a_materno VARCHAR(50) NOT NULL,
                    fecha_nacimiento DATE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            console.log('EXITO => La migracion fue levantada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo levantar: ' + error);
        }
    
    };


    // Metodo down
    async down(){
        try {
            await db.query('DROP TABLE IF EXISTS clients CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase ClientsTableMigration
module.exports = new ClientsTableMigration();
    
    