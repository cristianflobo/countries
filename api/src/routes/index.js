const {Router} = require('express')
const {getPaises, Busqueda, searchId} = require('./countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', getPaises);
//router.get('/countries?name', searchId) //req.query
router.get('/busqueda', Busqueda)
router.get('/countries/:id', searchId)   //req.params
router.get('/countries', getPaises);

module.exports = router;
