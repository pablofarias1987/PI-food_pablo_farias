const { Router } = require('express');
const router = Router();
const {get_allRecipes, get_DBRecipesID, get_APIRecipesID,} = require('../controllers/controllerRecipe');

// GET /recipes?name="...":

router.get('/', async (req, res, next) => {
    const { keyword } = req.query;  // Using the req object, we store the name that the user entered i.e "potato"
    try {
        let allRecipes = await get_allRecipes();  // Storing all recipes, from DB and API, in allRecipes
        if (keyword) {
            let recipeByName = await allRecipes.filter(r => r.name.toLowerCase().includes(keyword.toString().toLowerCase()));  // Just in case, we switch both to lower case
            if(recipeByName.length) {
                let recipes = recipeByName.map(r => {
                    return { 
                        id: r.id,
                        name: r.name,
                        summary: r.summary,
                        healthScore: r.healthScore,
                        image: r.image,
                        steps: r.steps,
                        diets: r.diets ? r.diets : r.diets.map(r => r.name)
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        } else {  // If no name, then all recipes will be shown
            let recipes = allRecipes.map(r => {
                return { 
                    id: r.id,
                    name: r.name,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    image: r.image,
                    steps: r.steps,
                    diets: r.diets ? r.diets : r.diets.map(r => r.name)
                }
            })
            return res.status(200).send(recipes)
        }
    } catch (err) {  // Else error will be sent
        next(err);
    }
});

// GET /recipes/{idReceta}:

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let validate = id.includes("-");  // UUIDV4 (used in the sequelize models) will include "-" in it, and id from API is always just a number
    try {
        if (validate) {
            let recipeDB = await get_DBRecipesID(id);
            return res.status(200).send(recipeDB);
        } else {    // Else, search it in API
            let recipeAPI = await get_APIRecipesID(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;