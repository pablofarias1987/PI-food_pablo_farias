const { Router } = require('express');
const recipesRoute = require('./recipes');
const recipeRoute = require('./recipe');
const dietsRoute = require('./diets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/recipes', recipesRoute);    // http://localhost:3001/recipes
router.use('/recipe', recipeRoute);     // http://localhost:3001/recipe
router.use('/diets', dietsRoute);       // http://localhost:3001/diets

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
