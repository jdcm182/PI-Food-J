import React from 'react'
import axios from 'axios'
//const { default: axios } = require('axios');
import style from './Test.module.css'

function Test() {

    //const dispatch = React.useDispatch();

    return (
        <div className={style.test}>
            Test
            <br />
            <button onClick={handleClick}>dispatch!</button>
            <button onClick={(e, num, offset) => apiToJSON(num || 5, offset || 0)}>api to JSON</button>
        </div >
    )

    async function handleClick() {
        console.log('Test.jsx > handleClick()')
        // dispatch({ type: 'TEST', payload: '' })
        try {
            let resp = await axios.get(`http://localhost:3001/recipes`)
            console.log('Test.jsx > handleClick() > resp: ', resp)
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

}


export default Test