const initialState = {
    allRecipes: [],
    shownRecipes: [],
    recipeDetails: [],
    diets: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RECIPES':
            return {
                ...state,
                shownRecipes: action.payload,  // Trough Redux, action.payload communicates with the corresponding react component to display the needed information
                allRecipes: action.payload,
            };
        case 'FETCH_RECIPE_BY_NAME':
            return {
                ...state,
                shownRecipes: action.payload,
            };
        case 'FETCH_RECIPE_DETAILS':
            return {
                ...state,
                recipeDetails: action.payload,
            };
        case 'CREATE_RECIPE':
            return {
                ...state,
            };
        case 'FETCH_DIETS':
            return {
                ...state,
                diets: action.payload,
            };
        case 'FILTER_BY_DIET_TYPE': 
            const all = state.allRecipes;  // We use the state of allRecipes to filter by diet type, to not grab any kind of recipe, just the corresponding ones
            const filter = action.payload === 'all' ? all : all.filter(r => r.diets.find(d => d.name === action.payload || d === action.payload));  // Which instruction has been received?
            return {
                ...state,
                shownRecipes: filter
            }
        case "ORDER_BY_HEALTHSCORE":
            let sortedByHealthScore = [...state.shownRecipes];
            sortedByHealthScore = action.payload === 'asc' ?
                state.shownRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) return 1;
                    if (a.healthScore < b.healthScore) return -1;
                    return 0;
                }) :
                state.shownRecipes.sort(function (a, b) {
                    if (a.healthScore < b.healthScore) return 1;
                    if (a.healthScore > b.healthScore) return -1;
                    return 0;
                });
            return {
                ...state,
                shownRecipes: sortedByHealthScore,
            };
        case 'ORDER_BY_LETTER': 
            let orderByLetter = [...state.shownRecipes];
            orderByLetter = action.payload === 'atoz' ?  // Has the instruction been received?
                state.shownRecipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;  // One case "a > b === true"
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                }) :
                state.shownRecipes.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;  // Other case "a > b === false"
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0
                });
            return {
                ...state,
                shownRecipes: orderByLetter,
            }
        case 'CLEAR_DETAIL':
            return {
                ...state,
                recipeDetails: []
            }
        default:
            return state;
    }
}