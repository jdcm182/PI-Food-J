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


export function getAllRecipes1() {
    console.log('👉 > actions > getAllRecipes1()')
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

export function getAllRecipes() {
    console.log('👉 > actions > getAllRecipes()')
    return async function (dispatch) {
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

export const getRecipes3 = () => async (dispatch) => {
    console.log('ACTIONS > getRecipes2() ----------')
    const response = await fetch('http://localhost:3001/recipes');
    const data = await response.json();
    console.log('💜getRecipes3 > dispatch: ', dispatch)
    dispatch({ type: 'GET_ALL_RECIPES', payload: data });
}


// Repaso M2 PT06 Diego
export function getRecipesPT06() {
    return (dispatch) => {
        console.log('💛 por hacer el axios.get.. ')
        axios.get("http://localhost:3001/recipes")
            .then((response) => {
                console.log('💛response.data: ', response.data)
                const results = response.data;
                console.log('💛dispatch: ', dispatch)
                dispatch({ type: 'GET_ALL_RECIPES', payload: results });
                // index.js:69 Uncaught (in promise) TypeError: dispatch is not a function at index.js:69:1
            });
    };
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


export function search(str) {
    return function (dispatch) {
        //                               /recipes?search={recipe}
        axios.get(`http://localhost:3001/recipes?search=${str}`)
            .then(r => r.data)
            .then(d => dispatch({ type: 'SEARCH_RESULTS', payload: d }))
            .catch(e => console.log(e));
    }
}