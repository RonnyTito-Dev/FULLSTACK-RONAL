
// rolesTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class RolesTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO roles (name, description) VALUES
                ('admin', 'El administrador del negocio'),
                ('pharmacist', 'El farmaceutico(a)'),
                ('cashier', 'El cajero');
            `);

            console.log('EXITO => El seeder "rolesTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "rolesTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE roles RESTART IDENTITY');

            console.log('EXITO => El seeder "rolesTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "rolesTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de RolesTableSeeder
module.exports = new RolesTableSeeder();
    