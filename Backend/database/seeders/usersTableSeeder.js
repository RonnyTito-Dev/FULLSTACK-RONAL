
// usersTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class UsersTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            await db.query(`INSERT INTO users (name, email, password, role_id) VALUES
                ('Pepito el matador', 'papito@gmail.com', '12345678', 1),
                ('Martita la Poderosa', 'martita@gmail.com', '12345678', 2),
                ('Bertita Torrejon', 'bertita@gmail.com', '12345678', 3)
            `);

            console.log('EXITO => El seeder "usersTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "usersTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE users RESTART IDENTITY');

            console.log('EXITO => El seeder "usersTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "usersTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de UsersTableSeeder
module.exports = new UsersTableSeeder();
    