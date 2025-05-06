
// salesTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class SalesTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO sales (user_id, customer_id, payment_method_id, total) VALUES
                (1, 1, 1, 5.00),
                (1, 2, 2, 9.00);
            `);

            console.log('EXITO => El seeder "salesTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "salesTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE sales RESTART IDENTITY CASCADE');

            console.log('EXITO => El seeder "salesTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "salesTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de SalesTableSeeder
module.exports = new SalesTableSeeder();
    