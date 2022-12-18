const axios = require('axios');
const { Diet, Recipe } = require('../db');
const { API_KEY, URL_SPOONACULAR } = process.env;

const get_APIRecipes = async () => {    
    const recipesPromiseApi = await axios.get(`${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const { results } = recipesPromiseApi.data;
    const filteredApiRecipes = await results?.map((r) => {
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            image: r.image,
            diets: r.diets,
        }
    }) 
    return filteredApiRecipes;
};

const get_APIRecipesID = async (id) => {
    const recipesPromiseApiID = await axios.get(`${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`);
    const details = recipesPromiseApiID.data;
   
    let recipeDetails = {
        id: details.id,
        name: details.title,
        summary: details.summary,
        healthScore: details.healthScore,
        steps: details.analyzedInstructions[0]?.steps.map(s => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        image: details.image,
        diets: details.diets,
    }

    return recipeDetails;
}

const get_DBRecipes = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const get_DBRecipesID = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const get_allRecipes = async () => {
    const getApi = await get_APIRecipes();
    const getDataBase = await get_DBRecipes();
    const all = [...getApi, ...getDataBase] // Same as: const all = getApi.concat(getDataBase);
    return all;
}

module.exports = { 
    get_allRecipes,
    get_DBRecipes,
    get_APIRecipes,
    get_DBRecipesID,
    get_APIRecipesID,
}