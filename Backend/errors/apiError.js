
// Clase personalizada para manejar errores en la API
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);                     // Constructor de la super clase
        this.statusCode = statusCode;       // Establecer el codigo HTTP
        this.message = message;             // Establecer el mensaje del error
    }

    // Metodo para crear un error de tipo "Bad Request" (Código 400)
    static badRequest(message) {
        return new ApiError(400, message);
    }

    // Metodo para crear un error de tipo "Not Found" (Código 404)
    static notFound(message) {
        return new ApiError(404, message);
    }

    // Metodo para crear un error de tipo "Internal Server Error" (Código 500)
    static internal(message) {
        return new ApiError(500, message);
    }

    // Metodo para crear un error de tipo "Unauthorized" (Código 401)
    static unauthorized(message) {
        return new ApiError(401, message);
    }

}

// Exportamos la clase ApiError para poder usarla en otros archivos
module.exports = ApiError;
