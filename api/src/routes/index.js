const {Router} = require('express')
const {getPaises, createTour, searchId,nametour} = require('./countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', getPaises);
//router.get('/countries?name', searchId) //req.query
router.post('/tour', createTour)
router.get('/countries/:id', searchId)   //req.params
router.get('/countries', getPaises);   ////?name=info
router.get('/nametour', nametour);   ////?name=info

module.exports = router;
