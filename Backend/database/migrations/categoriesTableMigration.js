
// categoriesTableMigration.js

// Importar conexion a db
const db = require('../../config/db');

class CategoriesTableMigration {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(`
                CREATE TABLE categories (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
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
            await db.query('DROP TABLE IF EXISTS categories CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase CategoriesTableMigration
module.exports = new CategoriesTableMigration();
    
    