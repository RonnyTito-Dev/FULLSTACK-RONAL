// server.js

const express = require('express'); // Importacion de express
const cors = require('cors'); // Importacion de cors
const cookieParser = require('cookie-parser'); // Importar el cookie parser
const { app } = require('./config/config'); // Importamos la configuracion de la app

// Importamos todos los enrutadores

const authRouter = require('./routes/authRouter'); // Enrutador de autenticacion

const roleRouter = require('./routes/roleRouter'); // Enrutador de roles
const userRouter = require('./routes/userRouter'); // Enrutador de usuarios
const categoryRoutes = require('./routes/categoryRouter'); // Enrutador de categorias
const productRoutes = require('./routes/productRouter'); // Enrutador de productos
const customerRoutes = require('./routes/customerRouter'); // Enrutador de clientes
const paymentMethodsRoutes = require('./routes/paymentMethodRouter'); // Enrutador de métodos de pago
const saleRoutes = require('./routes/saleRouter'); // Enrutador de ventas
const saleDetailRoutes = require('./routes/saleDetailRouter'); // Enrutador de detalles de ventas
const movementReasonRoutes = require('./routes/movementReasonRouter'); // Enrutador de razon de movimiento
const stockMovementRoutes = require('./routes/stockMovementRouter'); // Enrutador de movimientos de stock
const logRoutes = require('./routes/logRouter'); // Enrutador de logs

const reniecRoutes = require('./routes/reniecRouter'); // Enrutador reniec
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
        
        this.app.use(cors({
            origin: (origin, callback) => {
              if (!origin) return callback(null, true); // Permitir herramientas como Postman o cURL
              return callback(null, true);
            },
            credentials: true
        }));
          

        this.app.use(cookieParser()); // Habilitamos el uso de cookies
    }

    routes() {
        // Configuración de todas las rutas

        this.app.use('/auth', authRouter); // Ruta para autenticacion
        this.app.use('/roles', roleRouter); // Rutas de roles
        this.app.use('/users', userRouter); // Rutas de usuarios
        this.app.use('/categories', categoryRoutes); // Rutas de categorias
        this.app.use('/products', productRoutes); // Rutas de productos
        this.app.use('/customers', customerRoutes); // Rutas de clientes
        this.app.use('/payment-methods', paymentMethodsRoutes); // Rutas de métodos de pago
        this.app.use('/sales', saleRoutes); // Rutas de ventas
        this.app.use('/sale-details', saleDetailRoutes); // Rutas de detalles de ventas
        this.app.use('/movement-reasons', movementReasonRoutes); // Rutas de razones de movimiento
        this.app.use('/stock-movements', stockMovementRoutes); // Rutas de movimientos de stock
        this.app.use('/logs', logRoutes); // Rutas de logs

        this.app.use('/reniec', reniecRoutes); // Rutas de logs

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
