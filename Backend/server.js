const express = require('express'); // Importacion de express
const cors = require('cors'); // Importacion de cors
const { app } = require('./config/config'); // Importamos la configuracion de la app

const productRoutes = require('./routes/productRouter'); // Importamos el enrutador de productos
const clientRoutes = require('./routes/clientRouter'); // Importamos el enrutador de clientes

const errorHandler = require('./middleware/errorMiddleware'); // Importamos el middleware

// Clase del servidor
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json()); // Configuramos que trabajara con archivos json
        this.app.use(cors()); // Configuramos que usara cors
    }

    routes() {
        // Todas las rutas de productos se alojaran en /productos
        this.app.use('/productos', productRoutes);

        // Todas las rutas de clientes se alojaran en /clientes
        this.app.use('/clientes', clientRoutes);

        // Configuramos usar el middleware
        this.app.use(errorHandler); 
    }

    // Metodo para arrancar el servidor
    start() {
        const PORT = app.port;
        this.app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
}

const server = new Server(); // Creamos el servidor
server.start(); // Arrancamos el servidor
