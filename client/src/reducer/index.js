/*
██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
██████╔╝█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
██╔══██╗██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
██║  ██║███████╗██████╔╝╚██████╔╝╚██████╗███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝
                                                         */
const initialState = {
    recipes: [],
    diets: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES': return {
            ...state,
            recipes: action.payload
        }
        case 'GET_ALL_DIETS': return {
            ...state,
            diets: action.payload
        }
        default: return { ...state };
    };

}

//recipes: state.recipes.concat(action.payload)
//recipes: [...state.recipes, action.payload]