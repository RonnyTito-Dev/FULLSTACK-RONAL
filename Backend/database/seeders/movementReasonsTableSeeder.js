
// movementReasonsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class MovementReasonsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO movement_reasons (type, reason) VALUES
                ('in', 'Entrada de productos'),
                ('out', 'Salida de productos');
            `);

            console.log('EXITO => El seeder "movementReasonsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "movementreasonsTableSeeder.js": ', error);
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE movementreasons RESTART IDENTITY');

            console.log('EXITO => El seeder "movementreasonsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "movementreasonsTableSeeder.js": ', error);
        }
    
    };

}

// Exportamos una instancia de MovementReasonsTableSeeder
module.exports = new MovementReasonsTableSeeder();
    