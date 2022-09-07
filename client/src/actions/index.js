/*
 █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                                         */
//import axios from 'axios'

import axios from "axios"

/* 
// // NO FUNCIONA!!
export function getAllRecipes() {
    console.log('👉 > actions > getRecipes()')
    return function (dispatch) {
        console.log('> actions > getRecipes > dispatch: ', dispatch)
        return fetch(`http://localhost:3001/recipes`)
            .then(response => response.json())
            .then(recipes => {
                console.log('Actions > getAllRecipes > 2do .then > recipes: ', recipes);
                dispatch({ type: 'GET_ALL_RECIPES', payload: recipes })
            })
            .then(log => console.log('> actions > getRecipes > fetch finalizado con: ', log))
    }
}
 */
export function getAllRecipes() {
    console.log('👉 > actions > getRecipes()')

    return async function (dispatch) {
        // POR QUE NUNCA SE EJECUTA ?????????????????
        try {
            let resp = await axios.get(`http://localhost:3001/recipes`)
            console.log('ACTIONS > getAllRecipes() > resp: ', resp)
            dispatch({ type: 'GET_ALL_RECIPES', payload: resp.data })
        } catch (e) {
            console.log(e)
        }

    }
}

export function getRecipes2() {
    console.log('ACTIONS > getRecipes2() ----------')
    return function (dispatch) {
        console.log('dispatch: ', dispatch)
        return fetch(`http://localhost:3001/recipes`)
            .then(response => { console.log('fetch > response: ', response); return response.json() })
            .then(recipes => dispatch({ type: 'GET_ALL_RECIPES', payload: recipes }))
    }
}



    // return function (dispatch) {
    //     console.log('> actions > getRecipes > dispatch: ', dispatch)
    //     return fetch(`http://localhost:3001/recipes`)
    //         .then(response => response.json())
    //         .then(recipes => {
    //             console.log('Actions > getAllRecipes > 2do .then > recipes: ', recipes);
    //             dispatch({ type: 'GET_ALL_RECIPES', payload: recipes })
    //         })
    //         .then(log => console.log('> actions > getRecipes > fetch finalizado con: ', log))
    // }
