
// logsTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class logsTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE logs (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    action TEXT NOT NULL,
                    affected_table TEXT,
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
            await db.query('DROP TABLE IF EXISTS logs CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase logsTableMigration
module.exports = new logsTableMigration();
    
    