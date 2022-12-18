const { Router } = require('express');
const { Diet } = require("../db");
const { dietTypes } = require("../controllers/controllerDiet")
const router = Router();


// GET /diets:

router.get('/', async(req, res, next) => {
    try {
        dietTypes.forEach(async d => { // Going through each diet type in "../controllers/controllerDiet"
            await Diet.findOrCreate({ // Sequelize.findOrCreate returns an array i.e [row, created], row containing the data, and created true or false
                where: {
                    name: d
                }
            })
        }); // Now all diet types are found, or created
        const diets = await Diet.findAll(); // Showing all diet types from spoonacular
        res.send(diets);
    } catch (err){
        next(err);
    }
    
})

module.exports = router;

