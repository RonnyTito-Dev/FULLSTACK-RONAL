
// productsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class ProductsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            const result = await db.query(`INSERT INTO products (nombre, precio, descripcion) VALUES
                ('Laptop Asus 15.6', 2350, 'Una laptop de la guerra'),
                ('Mouse Logitech Master', 420, 'Un monito muy bonito'),
                ('Silla Gamer Ultra', 1220, 'Una silla que vale la pena');
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
    