
// categoriesTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class CategoriesTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO categories (name, description) VALUES
                ('Analgesics', 'Categoria analgesicos'),
                ('Antibiotics', 'Categoria antibioticos'),
                ('Vitamins', 'Categoria vitaminas');
            `);

            console.log('EXITO => El seeder "categoriesTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "categoriesTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE categories RESTART IDENTITY');

            console.log('EXITO => El seeder "categoriesTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "categoriesTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de CategoriesTableSeeder
module.exports = new CategoriesTableSeeder();
    