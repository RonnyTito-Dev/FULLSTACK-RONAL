
// salesTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class SalesTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE sales (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    customer_id INTEGER REFERENCES customers(id),
                    payment_method_id INTEGER REFERENCES payment_methods(id),
                    total NUMERIC(10, 2),
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
            await db.query('DROP TABLE IF EXISTS sales CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase SalesTableMigration
module.exports = new SalesTableMigration();
    
    