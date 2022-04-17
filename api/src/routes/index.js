const {Router} = require('express')
const {getPaises, tour, searchId} = require('./countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', getPaises);
//router.get('/countries?name', searchId) //req.query
router.post('/tour', tour)
router.get('/countries/:id', searchId)   //req.params
router.get('/countries', getPaises);   ////?name=info

module.exports = router;
