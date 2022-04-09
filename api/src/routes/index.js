const {Router} = require('express')
const axios = require('axios')
const {getPaises} = require('./countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', getPaises);
router.get('/home', getPaises);

module.exports = router;
