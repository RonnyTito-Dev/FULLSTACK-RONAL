const express = require('express');         // Importamos express
const router = express.Router();            // Inicializamos rutas de express
const clientController = require('../controllers/clientController'); // Importamos instancia cliente controller


// ======================================= SOLICITUD GET =======================================

router.get('/', (req, res) => clientController.getClients(req, res)); 

router.get('/dni/:dni', (req, res) => clientController.getClientByDNI(req, res));

router.get('/id/:id', (req, res) => clientController.getClientById(req, res));

// ======================================= SOLICITUD POST =======================================

router.post('/', (req, res) => clientController.createClient(req, res));



// ======================================= SOLICITUD PUT =======================================

router.put('/dni/:dni', (req, res) => clientController.updateClientByDNI(req, res));

router.put('/id/:id', (req, res) => clientController.updateClientById(req, res));


// ======================================= SOLICITUD DELETE =======================================

router.delete('/:dni', (req, res) => clientController.deleteClient(req, res));



module.exports = router; // Exportamos el router products