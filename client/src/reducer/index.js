/*
██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
██████╔╝█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
██╔══██╗██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
██║  ██║███████╗██████╔╝╚██████╔╝╚██████╗███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝
                                                         */
const dietTypes1 = [
    'vegetarian',
    'vegan',
    'glutenFree',
    'dairyFree',
    'veryHealthy',
    'cheap',
    'veryPopular',
    'sustainable',
    'lowFodmap'
]

const dietTypes2 = [
    { name: 'Gluten Free', description: 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).' },
    { name: 'Ketogenic', description: 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.' },
    { name: 'Vegetarian', description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin.' },
    { name: 'Lacto-Vegetarian', description: 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.' },
    { name: 'Ovo-Vegetarian', description: 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.' },
    { name: 'Vegan', description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.' },
    { name: 'Pescetarian', description: 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.' },
    { name: 'Paleo', description: 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.' },
    { name: 'Primal', description: 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.' },
    { name: 'Low FODMAP', description: 'FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)' },
    { name: 'Whole 30', description: 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.' }
]

const dietTypes = [
    { type: "gluten free", name: 'Gluten Free', filter: false, description: 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).' },
    { type: "dairy free", name: 'Dairy Free', filter: false, description: '' },
    { type: "lacto ovo vegetarian", name: 'Lacto-Ovo-Vegetarian', filter: false, description: '' },
    { type: "vegan", name: 'Vegan', filter: false, description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.' },
    { type: "paleolithic", name: 'Paleolithic', filter: false, description: 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.' },
    { type: "primal", name: 'Primal', filter: false, description: 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.' },
    { type: "whole 30", name: 'Whole 30', filter: false, description: 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.' },
    { type: "pescatarian", name: 'Pescetarian', filter: false, description: 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.' },
    { type: "ketogenic", name: 'Ketogenic', filter: false, description: 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.' },
    { type: "fodmap friendly", name: 'Low FODMAP', filter: false, description: 'FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)' }
]


// https://spoonacular.com/food-api/docs#Diets


const initialState = {
    recipes: [],
    allRecipes: [],
    //filteredRecipes: [],
    diets: [],
    dietTypes,
    searchStr: '',
    //cache: [],
    detail: {}
}



export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES': return {
            ...state,
            recipes: [...action.payload],
            allRecipes: [...action.payload]
        }
        case 'GET_ALL_DIETS': return {
            ...state,
            diets: action.payload
        }
        case 'SEARCH_RESULTS': return {
            ...state,
            recipes: action.payload,
            allRecipes: [...action.payload]
        }
        case 'SET_SEARCH': return {
            ...state,
            searchStr: action.payload
        }
        case 'SET_FILTERS': return {
            ...state,
            //filteredRecipes: action.payload
            recipes: action.payload
        }
        case 'SET_DIET_TYPES': return {
            ...state,
            //dietTypes.type[action.payload] = !dietTypes.type[action.payload]
            dietTypes: action.payload
        }
        case 'CLEAR_FILTERS':
            const diets = [...state.dietTypes]; // {...} nooo! es array!
            console.log('REDUCER > CLEAR_FILTERS > ')
            console.log('diets: ', diets)
            for (const diet of diets) { // diets is not iterable
                diet.filter = false;
            }
            /* for (let i = 0; i < diets.length; i++)
                diets[i].filter = false; */
            console.log('diets: ', diets)
            return {
                ...state,
                dietTypes: diets,
                filteredRecipes: state.recipes
            }
        case 'RESTORE_RECIPES': console.log('REDUCER > RESTORE_RECIPES')
            console.log('REDUCER > RESTORE_RECIPES > ')
            console.log('state.allRecipes', state.allRecipes)
            console.log('state.recipes', state.recipes)
            return {
                ...state,
                recipes: [...state.allRecipes]
            }
        case 'SET_DETAIL': return {
            ...state,
            detail: action.payload
        }
        default: return { ...state };
    };

}

//recipes: state.recipes.concat(action.payload)
//recipes: [...state.recipes, action.payload]