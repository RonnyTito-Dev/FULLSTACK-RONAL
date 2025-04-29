
// productsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class ProductsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO products (name, description, price, stock, category_id) VALUES
                ('Paracetamol 500 mg', 'Analgesico', 2.50, 100, 1),
                ('Amoxicilina 500 mg', 'Antibiotico para infecciones bacterianas', 5.75, 80, 2),
                ('Vitamina C 1g', 'Suplemento para el sistema inmune', 3.00, 150, 3);
            `);

            console.log('EXITO => El seeder "productsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "productsTableSeeder.js": ', error);
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE products RESTART IDENTITY');

            console.log('EXITO => El seeder "productsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "productsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de ProductsTableSeeder
module.exports = new ProductsTableSeeder();
    