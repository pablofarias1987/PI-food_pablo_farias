const { Router } = require('express');
const { Recipe, Diet } = require("../db");
const router = Router();


router.post('/', async (req, res, next) => {
    const { name, summary, healthScore, steps, image, diets } = req.body;
    console.log(req.body);
    try { 
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image,
        })
        let dietDB = await Diet.findAll({
            where: {
                name: diets,
            }
        })
        newRecipe.addDiet(dietDB);
        res.status(200).send(newRecipe);
    } catch (err){
        next(err);
    }
});

module.exports = router;