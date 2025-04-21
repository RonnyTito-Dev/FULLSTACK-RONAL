const path = require('path'); // Importa modulo path
const fs = require('fs'); // Importa modulo fs
const db = require('./config/db'); // Importamos configuracion de la base de datos

// Rutas de carpetas
const MODELSPATH = path.join(__dirname, 'models'); // Ruta de la carpeta models
const SERVICESPATH = path.join(__dirname, 'services'); // Ruta de la carpeta services
const CONTROLLERSPATH = path.join(__dirname, 'controllers'); // Ruta de la carpeta controllers
const ROUTESPATH = path.join(__dirname, 'routes'); // Ruta de la carpeta routes
const MIGRATIONSPATH = path.join(__dirname, 'database', 'migrations'); // Ruta de la carpeta migrations
const SEEDESPATH = path.join(__dirname, 'database', 'seeders'); // Ruta de la carpeta seeds



// =================================== HILO PRINCIPAL DEL SCRIPT ===================================

// Capturamos comando de la consola
const command = process.argv.splice(2);

// Verificar que el commando para el script sea valido
const [action, type, name] = verificationCommand(command);

// Funcion para verificar si es make | migrate | seed 
//console.log(action, type, name);
dispatch(action, type, name);




// ================================================================================================


// Funcion para verificar que el comando sea valido
function verificationCommand(command) {

    // Verificar que haya comandos
    if(command.length <= 1 || command.length > 2 ){
        console.log(`ERROR => Se debe definir la estructura "node ronnysan [action:type] [name]"`);
        process.exit(1);
    }

    // Extraemos el action_type y el name
    const [action_type, name] = command;

    // Verificar el action:type contenga :
    if(!action_type.includes(':')){
        console.log(`ERROR => El [action:type] debe contener ":"`);
        process.exit(1);
    }

    // Descestructuramos action type
    const [action, type] = action_type.split(':');

    // Verificamos el action type
    if(!action || !type){
        console.log(`ERROR => El [action:type] debe tener esa estructa "accion:tipo"`);
        process.exit(1);
    }

    // Verificamos el name
    if(!name){
        console.log(`ERROR => no ingrese name debe tener esa estructa "[action:type] [name]"`);
        process.exit(1);
    }


    // Retornamos todo validado
    // console.log(`estamos por retonar accion ${action} y tipo ${type} y filename ${name}`);
    return [ action, type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(), name ];

    
}



// Funcion para despachar segun la accion del command make | migrate | seed
function dispatch(action, type, name){

    switch (action){
        case 'make': // En caso de make
            makeDispatch(type, name);
            break;

        case 'migrate': // En caso de migrate
            migrateDispatch(type, name);
            break;

        case 'seeder': // En caso de seeder
            seedDispatch(type, name);
            break;

        default:
            console.log(`ERROR => ronnysan solo soporta acciones:  "make" | "migrate" | "seeder"`);
            break;
    };
}


// Funcion para despachar si es "make" : model | service | controller | router | migration | seeder
function makeDispatch(type, name){

    switch(type){
        case 'Model': // En caso de make:model
            makeModel(type, name); // Crear en makeModel()
            break;

        case 'Service': // En caso de make:service
            makeService(type, name); // Crear en makeService()
            break;

        case 'Controller': // En caso de make:controller
            makeController(type, name); // Crear en makeController()
            break;

        case 'Router': // en caso de make:router
            makeRouter(type, name); // Crear en makeRouter()
            break;

        case 'Migration': // En caso de make:migration
            makeMigration(type, name); // Crear en makeMigration()
            break;

        case 'Seeder': // En caso de make:seeder
            makeSeeder(type, name); // Crear en makeSeeder()
            break;

        case 'Autogen-mig': // En caso de make:autogen-mig
            makeAutoGenerate(type, name)
            break;

        default:
            console.log(`ERROR => ronnysan solo soporta tipos:  "make:model" | "make:service" | "make:controller" | "make:router" | "make:migration" | "make:seeder"`);
            break;
    }
}

// Funcion para make:model
function makeModel(type, name, columnsName){

    // Nombre de la clase: NameModel
    const className = name.charAt(0).toUpperCase() + name.slice(1) + type;
    
    // Nombre del archivo: nameModel
    const fileName = name.toLowerCase() + type;
    
    // Nombre del archivo con extension nameModel.js
    const fileNameExtension = fileName + '.js';

    // Nombre Singular
    const nameSingular = name;

    // Nombre Plural
    const namePlural = name + 's';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu ${className} 
class ${className} {

    
    
}

// Exportar una instancia de la clase ${className}
module.exports = new ${className}();
    `;

    
    // Contenido Completo
    const contentComplete = `
// ${fileNameExtension}

// Importamos la DB
const db = require('../config/db');

class ${className} {

    // Metodo para obtener todos los ${namePlural}
    async getAll${namePlural}(){
        const result = await db.query('SELECT * FROM ${namePlural.toLowerCase()}');
        return result.rows;
    }


    // Metodo para obtener un ${nameSingular} por id
    async get${nameSingular}ById(id){
        const result = await db.query('SELECT * FROM ${namePlural.toLowerCase()} WHERE = $1', [id]);
        return result.rows[0];
    }


    // Metodo para agregar un nuevo ${nameSingular} 
    async create${nameSingular}([${columnsName.map(data => data) + ', '}]){
        const result = await db.query('INSERT INTO ${namePlural.toLowerCase()} (${columnsName.map(col => '"' + col + '"').join(', ')}) VALUES ($1, $2, $3) RETURNING *', [dato1, dato2, dato3]);
        return result.rows[0];
    }


    // Metodo para actualizar un ${nameSingular} 
    async update${nameSingular}(id, { dato1, dato2, dato3, }){
        const result = await db.query('UPDATE ${namePlural.toLowerCase()} SET dato1 = $1, dato2 = $2, dato3 = $3 WHERE id = $4 RETURNING *', [dato1, dato2, dato3, id]);
        return result.rows[0];
    }


    // Metodo para eliminar un ${nameSingular} 
    async delete${nameSingular}(id){
        await db.query('DELETE FROM ${namePlural.toLowerCase()} WHERE id = $1', [id])
    
    }
}

// Exportar una instancia de la clase ${className}
module.exports = new ${className}();
    `;

    // Crear el archivo con contenido
    createFile(type, MODELSPATH, fileNameExtension, !columnsName ? contentBasic: contentComplete);
}


// Funcion para crear un Service make:service
function makeService(type, name, data){

    // Nombre de la clase: NameService
    const className = name.charAt(0).toUpperCase() + name.slice(1) + type;
    
    // Nombre del archivo: nameService
    const fileName = name.toLowerCase() + type;
    
    // Nombre del archivo con extension nameService.js
    const fileNameExtension = fileName + '.js';

    // Nombre Singular
    const nameSingular = name;

    // Nombre Plural
    const namePlural = name + 's';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}

// Importamos el ${nameSingular} Model
const ${nameSingular.toLowerCase()}Model = require('../models/${nameSingular.toLowerCase()}Model');

class ${className} {

    // Metodo para obtener todos los ${namePlural}
    async get${namePlural}(){
        return await ${nameSingular.toLowerCase()}Model.getAll${namePlural}();
    }


    // Metodo para obtner un ${nameSingular} por id
    async get${nameSingular}ById(id){
        return await ${nameSingular.toLowerCase()}Model.get${nameSingular}ById(id);
    }

    // Metodo para agregar un ${nameSingular}
    async add${nameSingular}(data){
        return await ${nameSingular.toLowerCase()}Model.create${nameSingular}(data);
    }

    // Metodo para editar un ${nameSingular}
    async modify${nameSingular}(id, data){
        return await ${nameSingular.toLowerCase()}Model.update${nameSingular}(id, data);
    }

    // Metodo para eliminar un ${nameSingular}
    async remove${nameSingular}(id){
        await ${nameSingular.toLowerCase()}Model.delete${nameSingular}(id);
    }

}

// Exportamos una instancia de ${className}
module.exports = new ${className}();
    `;



    // Contenido Completo
    const contentComplete = `
    class ${className} {
        // Este creara contenido completo
    }
    
    `;

    // Crear el archivo con contenido
    createFile(type, SERVICESPATH, fileNameExtension, !data ? contentBasic: contentComplete);
};


// Funcion para crear un Controller make:controller
function makeController(type, name, data){

    // Nombre de la clase: NameController
    const className = name.charAt(0).toUpperCase() + name.slice(1) + type;
    
    // Nombre del archivo: nameController
    const fileName = name.toLowerCase() + type;
    
    // Nombre del archivo con extension nameController.js
    const fileNameExtension = fileName + '.js';

    // Nombre Singular
    const nameSingular = name;

    // Nombre Plural
    const namePlural = name + 's';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}

// Importamos el ${nameSingular} Service
const ${nameSingular.toLowerCase()}Service = require('../services/${nameSingular.toLowerCase()}Service');

class ${className} {

    // ================================= METODOS GET =================================

    // Metodo para obtener todos los ${namePlural}
    async get${namePlural}(req, res){
        try {
            const ${namePlural.toLowerCase()} = await ${nameSingular.toLowerCase()}Service.get${namePlural}();
            res.json(${namePlural.toLowerCase()});

        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los ${namePlural}' });
        }
    };


    // Metodo para obtener un ${nameSingular} por id
    async get${nameSingular}ById(req, res){
    
        const { id } = req.params;

        try{
            const ${nameSingular.toLowerCase()} = await ${nameSingular.toLowerCase()}Service.get${nameSingular}ById(id);

            if(!${nameSingular.toLowerCase()}){
                return res.status(404).json({ message: '${nameSingular} no encontrado' });
            }

            res.json(${nameSingular.toLowerCase()});
        
        } catch(error){
            console.erro(error);
            res.status(500).json({ message: 'Error al obtener el ${nameSingular}' });
        }

    };



    // ================================= METODO POST =================================

    // Metodo para agregar un ${nameSingular} | [Debes adaptar este metodo manualmente]
    async create${nameSingular}(req, res){
        try {
            const { dato1, dato2, dato3 } = req.body;
            const new${nameSingular} = await ${nameSingular.toLowerCase()}Service.add${nameSingular}({ dato1, dato2, dato3 });
            res.status(201).json(new${nameSingular});
        
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al crear el ${nameSingular}' });
        }

    };




    // ================================= METODO PUT =================================

    // Metodo para actulizar un ${nameSingular} | [Debes adaptar este metodo manualmente]
    async updateProduct(req, res){
        
        try {
            const { id } = req.params;
            const { dato1, dato2, dato3 } = req.body;
            const updated${nameSingular} = await ${nameSingular.toLowerCase()}Service.modify${nameSingular}(id, { dato1, dato2, dato3 });
            res.json(updated${nameSingular});

        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el ${nameSingular}' });
        }
    
    };



    // ================================= METODO DELETE =================================

    // Metodo eliminar un ${nameSingular}
    async delete${nameSingular}(req, res){
        try {
            const { id } = req.params;
            await ${nameSingular.toLowerCase()}Service.remove${nameSingular}(id);
            res.sendStatus(204);

        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el ${nameSingular}' });
        }
    };

}

// Exportar una instancia de ${className}
module.exports = new ${className}();
    `;




    // Contenido Completo
    const contentComplete = `
    class ${className} {
        // Este creara contenido completo
    }
    
    `;

    // Crear el archivo con contenido
    createFile(type, CONTROLLERSPATH, fileNameExtension, !data ? contentBasic: contentComplete);
}


// Funcion para crear un Router make:router
function makeRouter(type, name, data){

    // Nombre de la clase: NameRouter
    const className = name.charAt(0).toUpperCase() + name.slice(1) + type;
    
    // Nombre del archivo: nameRouter
    const fileName = name.toLowerCase() + type;
    
    // Nombre del archivo con extension nameRrouter.js
    const fileNameExtension = fileName + '.js';

    // Nombre Singular
    const nameSingular = name;

    // Nombre Plural
    const namePlural = name + 's';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}

// Importamos express
const express = require('express');

// Inicializamos rutas de express
const router = express.Router();

// importamos ${nameSingular} Controller
const ${nameSingular.toLowerCase()}Controller = require('../controllers/${nameSingular.toLowerCase()}Controller');


// ================================= METODOS GET =================================

router.get('/', (req, res) => ${nameSingular.toLowerCase()}Controller.get${namePlural}(req, res));

router.get('/:id', (req, res) => ${nameSingular.toLowerCase()}Controller.get${nameSingular}ById(req, res));


// ================================= METODOS POST ==================================

router.post('/', (req, res) => ${nameSingular.toLowerCase()}Controller.create${nameSingular}(req, res));


// ================================= METODOS PUT ===================================

router.put('/:id', (req, res) => ${nameSingular.toLowerCase()}Controller.update${nameSingular}(req, res));


// ================================= METODOS DELETE =================================

router.delete('/:id', (req, res) => ${nameSingular.toLowerCase()}Controller.delete${nameSingular}(req, res));


// Exportamos el router ${nameSingular}
module.exports = router;

    `;



    // Contenido Completo
    const contentComplete = `
    class ${className} {
        // Este creara contenido completo
    }
    
    `;

    // Crear el archivo con contenido
    createFile(type, ROUTESPATH, fileNameExtension, !data ? contentBasic: contentComplete);
}


// Funcion para crear una Migration make:migration
function makeMigration(type, name, data){

    // Nombre de la clase: NameMigration
    const className = `${name + 's'}TableMigration`;

    // Fecha y hora del momento
    // const timestamp = new Date().toISOString().replace(/[-:T.]/g, '_').slice(0, 19);
    
    // Nombre del archivo: nameMigration
    const fileName = `${name.toLowerCase() + 's'}TableMigration`;
    
    // Nombre del archivo con extension nameMigration.js
    const fileNameExtension = fileName + '.js';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}


// Importar conexion a db
const db = require('../../config/db');

class ${className} {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query(\`
                CREATE TABLE ${name.toLowerCase() + 's'} (
                    id SERIAL PRIMARY KEY,

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            \`);

            console.log('EXITO => La migracion fue levantada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo levantar: ' + error);
        }
    
    };


    // Metodo down
    async down(){
        try {
            await db.query('DROP TABLE IF EXISTS ${name.toLowerCase() + 's'} CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente.');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
};


// Exportamos una instancia de la clase ${className}
module.exports = new ${className}();
    
    `;


    // Contenido Completo
    const contentComplete = `
// Importar conexion a db
const db = require('../../config/db');

// Este archivo de migracion generado por RonnySan
class ${className} {

    // Metodo up
    async up(){
    
        // Estructura de la tabla
        try{

            await db.query('
                CREATE TABLE ${name.toLowerCase() + 's'} (
                    id SERIAL PRIMARY KEY,


                    created_at TIMESTAMP DEFAUTL CURRENT_TIMESTAMP
                );
            
            ');

            console.log('EXITO => La migracion fue levantada correctamente');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo levantar: ' + error);
        }
    
    }

    // Metod down
    async down(){
        try {
            await db.query('DROP TABLE IF EXISTS ${name.toLowerCase() + 's'} CASCADE;');
            console.log('EXITO => La migracion fue quitada correctamente');
        
        } catch(error){
            console.log('ERROR => La migracion no se pudo quitar: ' + error);
        }
    }
    
}

// Exportamos una instancia de la clase ${className}
module.exports = new ${className}();
    
    `;


    // Crear el archivo con contenido
    createFile(type, MIGRATIONSPATH, fileNameExtension, !data ? contentBasic: contentComplete);
}


// Funcion para crear un Router make:seeder
function makeSeeder(type, name, data){

    // Nombre de la clase: NameSeeder
    const className = name.charAt(0).toUpperCase() + name.slice(1) + 'sTable' + type;
    
    // Nombre del archivo: nameSeeder
    const fileName = `${name.toLowerCase()}sTable${type}`;
    
    // Nombre del archivo con extension nameSeeder.js
    const fileNameExtension = fileName + '.js';

    // Nombre Singular
    const nameSingular = name;

    // Nombre Plural
    const namePlural = name + 's';
    
    // Contenido basico
    const contentBasic = `
// ${fileNameExtension}

// Importamos la db
const db = require('../../config/db');

class ${className} {
    
    // Metodo seeder up
    async up(){

        try{   

            const result = await db.query(\`INSERT INTO ${namePlural.toLowerCase()} (columna1, columna2, columna3) VALUES
                (valor1, valor2, valor3),
                (valor1, valor2, valor3);
            \`);

            console.log('EXITO => El seeder "${fileNameExtension}" fue levantado correctamente.');
        
        } catch(error){
            console.log('ERROR => Al ejecutar levantar el seeder "${fileNameExtension}": + error');
        };
    
    }


    // Metodo seeder down
    async down(){

        try{
            await db.query('TRUNCATE TABLE ${namePlural.toLowerCase()} RESTART IDENTITY');

            console.log('EXITO => El seeder "${fileNameExtension}" fue quitado correctamente.');

        } catch(error){
            console.log('ERROR => Al ejecutar quitar el seeder "${fileNameExtension}": + error');
        }
    
    };

}

// Exportamos una instancia de ${className}
module.exports = new ${className}();
    `;



    // Contenido Completo
    const contentComplete = `
    class ${className} {
        // Este creara contenido completo
    }
    
    `;

    // Crear el archivo con contenido
    createFile(type, SEEDESPATH, fileNameExtension, !data ? contentBasic: contentComplete);
}


// Funcion opara crear o generar todos los componentes
async function makeAutoGenerate(type, name){

    // Verificar que el archivo de migracion exista
    if(!existFile(MIGRATIONSPATH, name)){
        console.log(`ERROR => El archivo de migracion "${name}" no existe.`);
        process.exit(1);
    };
    
    // Extraemos el nombre de la tabla
    const tableName = name.split('TableMigration.js')[0];
    
    // Verificar que exista la tabla
    const existTableInDB = await existTable(tableName);

    if(!existTableInDB){
        console.error(`ERROR => La tabla "${tableName}" no existe, cree o ejecute una migracion antes de usar el "make:autogen-mig".`);
        process.exit(1);
    };

    // Armamos los nombre de archivos
    const nameSingular = tableName.slice(0, -1);
    const namePlural = tableName;

    const modelName = `${nameSingular}Model.js`;
    const serviceName = `${nameSingular}Service.js`;
    const controllerName = `${nameSingular}Controller.js`;
    const routerName = `${nameSingular}Router.js`;
    const seederName = `${namePlural}TableSeeder.js`;

    // Verificar que los archivos a contruir no existan
    if(existFile(MODELSPATH, modelName)){
        console.log(`ERROR => El archivo "${modelName}" de tipo [Model] ya existe y no puede usar el make:autogen-mig | Deberias eliminarla.`);
        process.exit(1);
    };

    if(existFile(SERVICESPATH, serviceName)){
        console.log(`ERROR => El archivo "${serviceName}" de tipo [Service] ya existe y no puede usar el make:autogen-mig | Deberias eliminarla.`);
        process.exit(1);
    };

    if(existFile(CONTROLLERSPATH, controllerName)){
        console.log(`ERROR => El archivo "${controllerName}" de tipo [Controller] ya existe y no puede usar el make:autogen-mig | Deberias eliminarla.`);
        process.exit(1);
    };

    if(existFile(ROUTESPATH, routerName)){
        console.log(`ERROR => El archivo "${routerName}" de tipo [Router] ya existe y no puede usar el make:autogen-mig | Deberias eliminarla.`);
        process.exit(1);
    };

    if(existFile(SEEDESPATH, seederName)){
        console.log(`ERROR => El archivo "${seederName}" de tipo [Seeder] ya existe y no puede usar el make:autogen-mig | Deberias eliminarla.`);
        process.exit(1);
    };
    
    
    // Obtner el nombre de las columas de la tabla
    const columnsName = await getColumnsTable(tableName);
    columnsName.shift(); // Quitamos el id
    columnsName.pop(); // Quitamos el creat_At

    // Verificar que tenga al menos 1 columna despues de quitar id y creat_At
    if(columnsName.length === 0){
        console.error(`ERROR => La tabla "${tableName}" no tiene columnas suficientes para el "make:autogen-mig".`);
        process.exit(1);
    };

    // Formatear el nombre ejempl Product
    const nameFormated = tableName.charAt(0).toUpperCase() + tableName.slice(1, -1);

    console.log('el nombre sera ', nameFormated);
    
    console.log('tipo es: ', type);
    // Creemos el modelo
    makeModel('Model', nameFormated, columnsName);



    

    
};




// ===================================== FUNCION QUE CREA ARCHIVOS =====================================

function createFile (type, PATH, fileNameExtension, content){

    // Crear PATH en caso no exista
    if(!fs.existsSync(PATH)){
        fs.mkdirSync(PATH);
        console.log(`INFO => La carpeta ${PATH} para archivos de tipo [${type}] fue creada.`);
    }

    // Verificar que el archivo exista
    if(fs.existsSync(path.join(PATH, fileNameExtension))){
        console.log(`ERROR => El archivo ${fileNameExtension} de tipo [${type}] ya existe.`);
        return;
    }

    // Crear el archivo con el contenido
    fs.writeFileSync(path.join(PATH, fileNameExtension), content);
    console.log(`EXITO => El archivo ${fileNameExtension} de tipo [${type}] fue creado correctamente.`);

};

// ==================================================================================================







// ===================================== FUNCIONES PARA MIGRACIONES =================================

// Funcion para despachar si es "migrate"
function migrateDispatch(type, name){

    // Verificar si es up o down
    if(type != 'Up' && type != 'Down'){
        console.log(`ERROR => ronnysan solo soporta tipos:  "migrate:up" | "migrate:down"`);
        process.exit(1);
    }

    // Verificar archivo de  migracion
    if(!existFile(MIGRATIONSPATH, name)){
        console.log(`ERROR => El archivo de migracion "${name}" no existe.`);
        process.exit(1);
    };

    // Ruta del archivo de migracion
    const migrationFilePath = path.join(MIGRATIONSPATH, name);

    switch (type) {
        case 'Up': // En caso de migrate:up
            migrateUp(migrationFilePath); // Ejecutar la subida
            break;
        
        case 'Down': // En caso de migrate:down
            migrateDown(migrationFilePath); // Ejecutar la bajada
            break;
    
        default: // En caso de migrate:desconodico
            break;
            
    }
};


// Funcion para migrateUP
function migrateUp(migrationFilePath){
    
    // Cargamos el archivo
    const migration = require(migrationFilePath);
    migration.up()
    
}


// Funcion para migrateDown
function migrateDown(migrationFilePath){

    // Cargamos el archivo
    const migration = require(migrationFilePath);
    migration.down();

}





// ===================================== FUNCIONES PARA SEEDERS =================================


// Funcion para descachar si es "seeder"
async function seedDispatch(type, name){
    
    // Verificar si es up o down
    if(type != 'Up' && type != 'Down'){
        console.error(`ERROR => ronnysan solo soporta tipos:  "seeder:up" | "seeder:down"`);
        process.exit(1);
    }

    // Verificar archivo seeder
    if(!existFile(SEEDESPATH, name)){
        console.log(`ERROR => El archivo seeder "${name}" no existe.`);
        process.exit(1);
    };

    // Ruta del archivo seeder
    const seederFilePath = path.join(SEEDESPATH, name);
    
    // Obtenemos el nombre de tabla
    const tableName = name.split('TableSeeder.js')[0];

    // Verificar que exista la tabla
    const existTableInDB = await existTable(tableName);

    if(!existTableInDB){
        console.error(`ERROR => La tabla "${tableName}" no existe, cree o ejecute una migracion`);
        process.exit(1);
    }

    switch (type) {
        case 'Up': // En caso de seeder:up
            seederUp(seederFilePath); // Ejecutar la subida
            break;
        
        case 'Down': // En caso de seeder:down
            seederDown(seederFilePath); // Ejecutar la bajada
            break;
    
        default: // En caso de seeder:desconodico
            break;
            
    }
};


// Funcion para seeder UP
function seederUp(seederFilePath){
    // Cargamos el archivo
    const seeder = require(seederFilePath);
    seeder.up();

}


// Funion para seeder DOWN
function seederDown(seederFilePath){
    // Cargamos el archivo
    const seeder = require(seederFilePath);
    seeder.down();
}


// ===================================== FUNCIONES GLOBALES =================================


// Funcion para verificar si una tabla existe
async function existTable(tableName){
    
    try {
        const result = await db.query(`SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = $1
        );
        `, [tableName]);

        return result.rows[0].exists;

    } catch(error){
        console.error('Error verificando existencia de la tabla:', error.message);
        process.exit(1);
    }
};


// Funcion para obtener las columnas de una tabla
async function getColumnsTable(tableName){

    try {
        const result = await db.query(`SELECT column_name FROM information_schema.columns
            WHERE table_name = $1 AND table_schema = 'public';`
        , [tableName]);

        // Extraemos los nombres a un array
        const columnNames = result.rows.map(row => row.column_name);

        return columnNames;

    } catch(error){
        console.error(`ERROR => No se pudo obtener las columnas de la tabla "${tableName}".`, error);
    };
}


// Funcion para verificar la existencia de un archivo
function existFile(pathFile, nameFile){

    // Ruta del archivo a verificar
    const filePath = path.join(pathFile, nameFile);

    if(fs.existsSync(filePath)){

        return true; // SI existe
    };

    return false; // No existe

};



// Funcion para obtener columnas de un tabla
// async function getColumnsTable(tableName){
//     try{
//         const result = await db.query(`SELECT column_name FROM information_schema.columns
//             WHERE table_name = $1 AND table_schema = 'public' ORDER BY ordinal_position;`, [tableName]);

//         const columnsComplete = result.rows.map(row => row.column_name);
//         const columns = columnsComplete.slice(1, -1);
//         return columns;

//     } catch(error){
//         console.error(`ERROR => Al obtener las columnas de la tabla ${tableName}: \n ${error}`);
//         return [];
//     }
// }