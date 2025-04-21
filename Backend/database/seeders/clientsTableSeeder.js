
// clientsTableSeeder.js

// Importamos la db
const db = require('../../config/db');

class ClientsTableSeeder {
    
    // Metodo seeder up
    async up(){

        try{   

            const result = await db.query(`INSERT INTO clients (dni, nombre, a_paterno, a_materno, fecha_nacimiento) VALUES
                ('12345678', 'Juan', 'Perez', 'Gonzalez', '1990-05-15'),
                ('23456789', 'Ana', 'Lopez', 'Martinez', '1985-08-25'),
                ('34567890', 'Carlos', 'Ramirez', 'Fernandez', '1992-03-10'),
                ('45678901', 'Marta', 'Garcia', 'Sanchez', '1988-11-02'),
                ('56789012', 'Pedro', 'Diaz', 'Torres', '1995-01-30');
            `);

            console.log('EXITO => El seeder "clientsTableSeeder.js" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "clientsTableSeeder.js": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE clients RESTART IDENTITY');

            console.log('EXITO => El seeder "clientsTableSeeder.js" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "clientsTableSeeder.js": + error');
        }
    
    };

}

// Exportamos una instancia de ClientsTableSeeder
module.exports = new ClientsTableSeeder();
    