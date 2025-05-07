
// rolesTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class RolesTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO roles (name, description) VALUES
                ('Super Admin', 'El de super privilegios'),
                ('Admin', 'El Administrador del negocio'),
                ('Farmaceutic@', 'El farmaceutico(a)'),
                ('Cajer@', 'El cajero(a)');
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
    