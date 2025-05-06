// Importamos axios para realizar la petición HTTP
const axios = require('axios');

// Importamos el manejador de errores personalizado
const ApiError = require('../errors/apiError');

// Configuración de la API de RENIEC
const RENIEC_API_URL = 'https://api.apis.net.pe/v2/reniec/dni';
const API_TOKEN = 'apis-token-14811.pA9pvH9OM6MoKszQoPTE7vx1L0rOFORy';

class ReniecService {

    // Método para obtener datos de una persona por DNI
    async getReniecDataByDni(dni) {
        if (!dni || !/^\d{8}$/.test(dni)) {
            throw ApiError.badRequest('DNI invalido. Debe tener 8 digitos en numero');
        }

        try {
            const response = await axios.get(`${RENIEC_API_URL}?numero=${dni}`, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    Accept: 'application/json'
                }
            });

            if (response.status === 200 && response.data) {
                return {
                    nombres: response.data.nombres,
                    apellidoPaterno: response.data.apellidoPaterno,
                    apellidoMaterno: response.data.apellidoMaterno
                };
            } else {
                throw ApiError.notFound('No se encontro informacion para el DNI proporcionado');
            }

        } catch (error) {
            const mensaje = error.response?.data?.message || error.message;
            throw ApiError.internal(`Error al consultar RENIEC: ${mensaje}`);
        }
    }
}

module.exports = new ReniecService();
