const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const recipesRouter = require('./recipesRouter.js')
router.use('/recipes', recipesRouter)

const diets = require('./')


module.exports = router;
