// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

const errorHandler = (err, req, res, next) => {

    if(err instanceof ApiError) {
        // Si es un error de ApiError, respondemos con el mensaje y el codigo HTTP
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Para errores no esperados o desconocidos
    console.error(err);
    return res.status(500).json({ message: 'Algo salió mal en el servidor' });
}

// Exportamos los errores
module.exports = errorHandler;