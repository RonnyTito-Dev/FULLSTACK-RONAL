// server.js

const express = require('express'); // Importacion de express
const cors = require('cors'); // Importacion de cors
const { app } = require('./config/config'); // Importamos la configuracion de la app

// Importamos todos los enrutadores
const roleRouter = require('./routes/roleRouter'); // Enrutador de roles
const userRouter = require('./routes/userRouter'); // Enrutador de usuarios
const categoryRoutes = require('./routes/categoryRouter'); // Enrutador de categorias
const productRoutes = require('./routes/productRouter'); // Enrutador de productos
const customerRoutes = require('./routes/customerRouter'); // Enrutador de clientes
const paymentMethodsRoutes = require('./routes/paymentMethodRouter'); // Enrutador de métodos de pago
const saleRoutes = require('./routes/saleRouter'); // Enrutador de ventas
const saleDetailRoutes = require('./routes/saleDetailRouter'); // Enrutador de detalles de ventas
const stockMovementRoutes = require('./routes/stockMovementRouter'); // Enrutador de movimientos de stock
const logRoutes = require('./routes/logRouter'); // Enrutador de logs

const errorHandler = require('./middleware/errorMiddleware'); // Importamos el middleware para errores

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
        // Configuración de todas las rutas

        this.app.use('/roles', roleRouter); // Rutas de roles
        this.app.use('/users', userRouter); // Rutas de usuarios
        this.app.use('/categorias', categoryRoutes); // Rutas de categorias
        this.app.use('/productos', productRoutes); // Rutas de productos
        this.app.use('/clientes', customerRoutes); // Rutas de clientes
        this.app.use('/metodos-pago', paymentMethodsRoutes); // Rutas de métodos de pago
        this.app.use('/ventas', saleRoutes); // Rutas de ventas
        this.app.use('/detalles-venta', saleDetailRoutes); // Rutas de detalles de ventas
        this.app.use('/movimientos-stock', stockMovementRoutes); // Rutas de movimientos de stock
        this.app.use('/logs', logRoutes); // Rutas de logs

        // Configuración del middleware de errores
        this.app.use(errorHandler); 
    }

    // Método para arrancar el servidor
    start() {
        const PORT = app.port;
        this.app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
}

const server = new Server(); // Creamos el servidor
server.start(); // Arrancamos el servidor
