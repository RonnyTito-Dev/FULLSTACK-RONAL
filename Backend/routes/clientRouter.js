const express = require('express');         // Importamos express
const router = express.Router();            // Inicializamos rutas de express
const clientController = require('../controllers/clientController'); // Importamos instancia cliente controller


// ======================================= SOLICITUD GET =======================================

router.get('/', clientController.getClients); 

router.get('/dni/:dni', clientController.getClientByDNI);

router.get('/id/:id', clientController.getClientById);

// ======================================= SOLICITUD POST =======================================

router.post('/', clientController.createClient);



// ======================================= SOLICITUD PUT =======================================

router.put('/dni/:dni', clientController.updateClientByDNI);

router.put('/id/:id', clientController.updateClientById);


// ======================================= SOLICITUD DELETE =======================================

router.delete('/:dni', clientController.deleteClient);



module.exports = router; // Exportamos el router products