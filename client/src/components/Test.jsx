import React from 'react'
import axios from 'axios'
//const { default: axios } = require('axios');
import style from './Test.module.css'

import { /* getAllRecipes, */ getRecipes2 } from '../actions';
import { /* connect, */ useDispatch } from 'react-redux'

function Test() {

    const dispatch = useDispatch(); //React.useDispatch is not a function

    return (
        <div className={style.test}>
            Test
            <br />
            <button className={style.btnTest} onClick={handleDispatch}>dispatch!</button>
            <button className={style.btnTest} onClick={(e, num, offset) => apiToJSON(num || 5, offset || 0)}>api to JSON</button>
            <button className={style.btnTest} onClick={(e, num) => videogamesToJSON(num || 1)}>videogames to JSON</button>

            <br />
            <button className={style.btnTest} onClick={() => getRecipes2()}>getRecipes2</button>


        </div >
    )

    // FUNCIONA OK! obtiene recipes de la BD y envia al Reducer
    async function handleDispatch() {
        console.log('Test.jsx > handleDispatch()------------')
        // dispatch({ type: 'TEST', payload: '' })
        try {
            // Esto FUNCIONA!! y actions.getAllRecipes NO!
            let resp = await axios.get(`http://localhost:3001/recipes`)
            console.log('Test.jsx > handleDispatch() > resp: ', resp)
            dispatch({ type: 'GET_ALL_RECIPES', payload: resp.data })

        } catch (e) {
            console.log(e)
        }
        // const fetchPosts = async () => {
        //     let resp = await axios.get(`http://localhost:3001/recipes`)
        //     console.log('Test.jsx > handleClick > resp: ', resp)
        // }

        // fetchPosts();
    }

    async function apiToJSON(number, offset) {
        // GET test/api_to_JSON?offset=200
        // let number = 100;
        // let offset = 0;
        try {
            let resp = await axios.get(`http://localhost:3001/test/api_to_JSON?number=${number}&offset=${offset}`);
            console.log('Test.jsx > apiToJSON() > resp: ', resp)
        } catch (e) {
            console.log(e)
        }

    }

    async function videogamesToJSON(pagFrom) {
        try {
            //const pagFrom = 1;
            let resp = await axios.get(`http://localhost:3001/test/vg/${pagFrom}`);
            console.log('async function videogamesToJSON() ------------------')
            console.log('resp: ', resp)
        } catch (e) {
            console.log(e)
        }
    }

}

/* export function mapDispatchToProps(dispatch) {
    return {
        getRecipes: dispatch(getAllRecipes());
    }
} */




export default Test