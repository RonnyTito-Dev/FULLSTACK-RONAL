const db = require('./config/db');

(async () => {
    try {
        // Ejecutamos una consulta para probar la conexion
        const result = await db.query('SELECT NOW()');
        console.log('Conexion exitosa a la fecha y hora actual: ', result.rows[0]);
    } catch (error) {
        console.log('Error de conexion: ', error);
    }
})();
