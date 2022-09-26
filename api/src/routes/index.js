const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const recipesRouter = require('./recipesRouter.js')
router.use('/recipes', recipesRouter)

const testRouter = require('./testRouter.js')
router.use('/test', testRouter)

// const dietsRouter = require('./dietsRouter.js')
// router.use('/diets', dietsRouter)

const detailRouter = require('./detailRouter.js')
router.use('/detail', detailRouter)

const recipeRouter = require('./recipeRouter.js')
router.use('/recipe', recipeRouter)


module.exports = router;
