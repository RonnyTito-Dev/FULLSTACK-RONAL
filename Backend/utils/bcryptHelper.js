// Importamos el bcrypt
const bcrypt = require('bcrypt');

// Importamos configuracion de bcrypt salt
const { bcrypt_config } = require('../config/config');


// Funcion para encryptar password
async function hashPassword(plainTextPassword){
    return await bcrypt.hash(plainTextPassword, bcrypt_config.saltRounds);
}

// Funcion para descriptar password
async function comparePassword(plainTextPassword, hashPassword) {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

// Exportar el modulo
module.exports = {
    hashPassword,
    comparePassword
}
