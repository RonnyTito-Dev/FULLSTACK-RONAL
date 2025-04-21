require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    },
};
