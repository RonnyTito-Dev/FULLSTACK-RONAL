const { Pool } = require('pg'); // Importamos pg
const { db } = require('./config'); // Importamos la configuracion de la DB

class DataBase {
    constructor() {
        // En el constructor de la clase
        this.pool = new Pool(db);
    }

    // Metodo query para realizar consultas a la DB
    query(text, params) {
        return this.pool.query(text, params);
    }
}

// Exportamos una instancia unica de la clase Data Base
module.exports = new DataBase();
