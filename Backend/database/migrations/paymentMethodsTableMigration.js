
// paymentMethodsTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class paymentMethodsTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE payment_methods (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    description TEXT,
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
            await db.query('DROP TABLE IF EXISTS payment_methods CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase payment_methodsTableMigration
module.exports = new paymentMethodsTableMigration();
    
    