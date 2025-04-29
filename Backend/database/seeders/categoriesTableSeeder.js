
// categoriesTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class CategoriesTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO categories (name) VALUES
                ('Analgesics'),
                ('Antibiotics'),
                ('Vitamins');
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
    