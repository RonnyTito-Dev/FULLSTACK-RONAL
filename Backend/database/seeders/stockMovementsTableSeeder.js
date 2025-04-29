
// stockMovementsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class StockMovementsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO stock_movements (product_id, type, quantity, reason, user_id) VALUES
                (1, 'input', '100', 'Stock Inicial', 1),
                (1, 'input', '80', 'Stock Inicial', 1),
                (1, 'input', '150', 'Stock Inicial', 1),
                (1, 'output', '2', 'Venta al cliente', 3),
                (1, 'output', '1', 'Venta al cliente', 3);
            `);

            console.log('EXITO => El seeder "stock_movementsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "stock_movementsTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE stock_movements RESTART IDENTITY');

            console.log('EXITO => El seeder "stockMovementsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "stockMovementsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de Stock_movementsTableSeeder
module.exports = new StockMovementsTableSeeder();
    