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
    dispatch({ type: 'GET_ALL_RECIPES', payload: data });
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
