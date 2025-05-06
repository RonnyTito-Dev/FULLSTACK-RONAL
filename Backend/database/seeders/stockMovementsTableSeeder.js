
// stockMovementsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class StockMovementsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO stock_movements (product_id, movement_reason_id, quantity, user_id) VALUES
                (1, 1, 100, 1),
                (1, 1, 80, 1),
                (1, 1, 150, 1),
                (1, 2, 2, 3),
                (1, 2, 1, 3);
            `);

            console.log('EXITO => El seeder "stockMovementsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "stockMovementsTableSeeder.js": ', error);
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE stock_movements RESTART IDENTITY');

            console.log('EXITO => El seeder "stockMovementsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "stockMovementsTableSeeder.js": ', error);
        }
    
    };

}

// Exportamos una instancia de Stock_movementsTableSeeder
module.exports = new StockMovementsTableSeeder();
    