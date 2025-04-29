
// logsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class LogsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO logs (user_id, action, affected_table) VALUES
                (1, 'Stock inicial crado', 'stock_movements'),
                (3, 'Venta Procesada', 'sales'),
                (3, 'Detalle de venta registrada', 'sale_details');
            `);

            console.log('EXITO => El seeder "logsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "logsTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE logs RESTART IDENTITY');

            console.log('EXITO => El seeder "logsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "logsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de LogsTableSeeder
module.exports = new LogsTableSeeder();
    