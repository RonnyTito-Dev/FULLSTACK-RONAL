
// stockMovementsTableMigration.js


// Importar conexion a db
const db = require('../../config/db');

class stockMovementsTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE stock_movements (
                    id SERIAL PRIMARY KEY,
                    product_id INTEGER REFERENCES products(id),
                    movement_reason_id INTEGER REFERENCES movement_reasons(id),
                    quantity INTEGER NOT NULL,
                    user_id INTEGER REFERENCES users(id),
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
            await db.query('DROP TABLE IF EXISTS stock_movements CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase stock_movementsTableMigration
module.exports = new stockMovementsTableMigration();
    
    