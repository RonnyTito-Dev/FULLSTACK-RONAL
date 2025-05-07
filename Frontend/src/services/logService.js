// logService.js
import api from '../api/axiosInstance';

export const createLog = async (logInfo) => {
    try {
        // Obtener información del usuario autenticado
        const { data: user } = await api.get('/auth/me');

        if (!user?.id) {
            throw new Error('No se pudo obtener el ID del usuario autenticado');
        }

        // Armar log completo
        const logData = {
            user_id: user.id,
            ...logInfo,
        };

        // Enviar log
        const response = await api.post('/logs', logData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el log:', error);
        throw error;
    }
};
