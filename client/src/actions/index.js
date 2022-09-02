/*
 █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                                         */
//import axios from 'axios'

export function getRecipes() {
    console.log('> actions > getRecipes()')
    return function (dispatch) {
        console.log('> actions > getRecipes > dispatch: ', dispatch)
        return fetch(`http://localhost:3001/recipes`)
            .then(response => response.json())
            .then(recipes => dispatch({ type: 'GET_ALL_RECIPES', payload: recipes }))
            .then(log => console.log('> actions > getRecipes > fetch finalizado con: ', log))
    }
}