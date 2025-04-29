
// saleDetailsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class SaleDetailsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO sale_details (sale_id, product_id, quantity, unit_price) VALUES
                (1, 1, 2, 2.50),
                (2, 2, 1, 5.75),
                (2, 3, 1, 3.00);
            `);

            console.log('EXITO => El seeder "saleDetailsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "saleDetailsTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE sale_details RESTART IDENTITY');

            console.log('EXITO => El seeder "sale_detailsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "sale_detailsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de Sale_detailsTableSeeder
module.exports = new SaleDetailsTableSeeder();
    