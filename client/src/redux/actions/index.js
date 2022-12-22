import axios from 'axios';

export function fetchRecipes() {
    return async function(dispatch) {
        try{
            const response = await axios.get(`/recipes`);  // `/recipes` is enough because the "root directory" was specified as '/' in db.js 
            return dispatch({  // the action type, along with action.payload, will report to the store, updating the state. 
                type: 'FETCH_RECIPES',  // What happened
                payload: response.data,  // Additional info
            });
        } catch (err) {
            console.log(err);
        }
    }
};
export function fetchRecipeByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`/recipes/?keyword=${name}`)
            return dispatch({
                type: "FETCH_RECIPE_BY_NAME",
                payload: response.data
            });
        } catch (err) {
            alert("The recipe was not found")
        }
    }
}
export function fetchRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`/recipes/${payload}`);
            return dispatch({
                type: 'FETCH_RECIPE_DETAILS',
                payload: response.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}
export function createRecipe(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.post(`/recipe`, payload);
            return dispatch({
                type: 'CREATE_RECIPE',
                payload: response,
            })
        } catch (err) {
            console.log(err);
        }
    }
}
export function fetchDiets() {
    return async function(dispatch) {
        try {
            let response = await axios.get(`/diets`);  // 
            return dispatch({
                type: 'FETCH_DIETS',
                payload: response.data.map(d => d.name)  // Will return a new array with the name of each diet
            })
        } catch (err) {
            console.log(err);
        }
    }
}
export function filterByDietType(payload) {
    return {
        type: 'FILTER_BY_DIET_TYPE',
        payload
    }
};
export function orderByLetter(payload) {
    return {
        type: 'ORDER_BY_LETTER',
        payload
    }
}

export function orderByHealthScore(payload) {
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload
    }
}

export function clearDetail() {
    return {
        type: 'CLEAR_DETAIL'
    }
}