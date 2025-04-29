
// customersTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class CustomersTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO customers (name, dni, email, phone, address, date_of_birth) VALUES
                ('Abelardo Paredez', '00000000', 'abelardo@gmail.com', '987654321', 'Calle los gorriones', '2004-06-15'),
                ('Juan Perez', '10101010', 'juan@gmail.com', '987654321', 'Calle los claveles', '2000-01-10'),
                ('Karen Ramires', '20202020', 'kancenr@gmail.com', '987654321', 'Av los tulipanes', '1999-12-01'),
                ('Mirella Juarez', '30303030', 'mirejuarez@gmail.com', '987654321', 'Calle SN', '2001-08-23'),
                ('Tomacito Canales', '40404040', 'tomas@gmail.com', '987654321', 'Jr lima 121', '2002-10-19');
            `);

            console.log('EXITO => El seeder "customersTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "customersTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE customers RESTART IDENTITY');

            console.log('EXITO => El seeder "customersTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "customersTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de CustomersTableSeeder
module.exports = new CustomersTableSeeder();
    