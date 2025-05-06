
// movementReasonsTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class MovementReasonsTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE movement_reasons (
                    id SERIAL PRIMARY KEY,
                    type VARCHAR(10) CHECK (type IN('in', 'out')),
                    reason VARCHAR(50) NOT NULL,
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
            await db.query('DROP TABLE IF EXISTS movement_reasons CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase MovementReasonsTableMigration
module.exports = new MovementReasonsTableMigration();
    
    