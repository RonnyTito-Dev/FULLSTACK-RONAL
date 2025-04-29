
// paymentMethodsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class PaymentMethodsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO payment_methods (name) VALUES
                ('Cash'),
                ('Credit Card'),
                ('Yape');
            `);

            console.log('EXITO => El seeder "paymentMethodsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "paymentMethodsTableSeeder.js": ', error);
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE payment_methods RESTART IDENTITY');

            console.log('EXITO => El seeder "paymentMethodsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "paymentMethodsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de Payment_methodsTableSeeder
module.exports = new PaymentMethodsTableSeeder();
    