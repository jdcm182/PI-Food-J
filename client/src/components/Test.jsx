import React from 'react'
import axios from 'axios'
//const { default: axios } = require('axios');

function Test() {

    //const dispatch = React.useDispatch();

    return (
        <div>
            Test
            <br />
            <button onClick={handleClick}>dispatch!</button>
        </div>
    )

    async function handleClick() {
        console.log('CLICK!')
        // dispatch({ type: 'TEST', payload: '' })
        let resp = await axios.get(`http://localhost:3001/recipes`)
        console.log('Test.jsx > handleClick > resp: ', resp)
        // const fetchPosts = async () => {
        //     let resp = await axios.get(`http://localhost:3001/recipes`)
        //     console.log('Test.jsx > handleClick > resp: ', resp)
        // }

        // fetchPosts();


    }

}


export default Test