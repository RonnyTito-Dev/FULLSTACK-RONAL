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

    bcrypt_config: {
        saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    },

    jwt_config: {
        secretKey: process.env.SECRET_KEY,
    }
};
