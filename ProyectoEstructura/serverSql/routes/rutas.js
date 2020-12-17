const express = require('express');
const router = express.Router();
const ctrlUbicacion = require('../controlador');

router.post('/sendUbication', ctrlUbicacion.sendUbication);

router.post('/getUbications', ctrlUbicacion.getUbications);


module.exports = router;