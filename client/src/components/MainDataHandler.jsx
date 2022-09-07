import React, { useState, useEffect } from 'react';
import style from './MainDataHandler.module.css';
import Test from './Test.jsx'
import RecipesGrid from './RecipesGrid.jsx'
import { connect, useDispatch } from 'react-redux';
import { Pagination } from './Pagination.jsx';
import axios from 'axios';

import { getAllRecipes } from '../actions';

const ITEMS_PER_PAGE = 9;




// Pagination, Sort & Filter
export /* default */ function Main(props) {
    console.log('------------------------------------------------------------------------')
    console.log('MainDataHandler.jsx > props: ', props)

    const [page, setPage] = useState(1);
    const [subset, setSubset] = useState([]);

    const dispatch = useDispatch();

    //const [posts, setPosts] = useState([]);

    function actPage(p) {
        setPage(p);
    }

    /*  LOGICA DE PAGINACION*/
    //let subset = [];
    //subset = props.recipes.slice(
    async function paginar() {

        console.log('----------------------funcion paginar----------------------')
        console.log('MainDataHandler.jsx > paginar() > props.recipes: ', props.recipes)
        console.log('MainDataHandler.jsx > paginar() > ITEMS_PER_PAGE: ', ITEMS_PER_PAGE)
        console.log('MainDataHandler.jsx > paginar() > page: ', page)
        console.log('MainDataHandler.jsx > paginar() > subset: ', subset)

        let resp = await axios.get(`http://localhost:3001/recipes`)
        console.log('Test.jsx > handleDispatch() > resp: ', resp)
        dispatch({ type: 'GET_ALL_RECIPES', payload: resp.data })

        //
        setSubset(resp.data)

        props.recipes && setSubset(props.recipes.slice(
            (page - 1) * ITEMS_PER_PAGE,
            (page * ITEMS_PER_PAGE) /* - 1 */
        ));
        console.log('MainDataHandler.jsx > Paginar() > subset: ', subset)

    }

    //const dispatch = useDispatch();

    if (props.recipes !== undefined && props.recipes.length === 0) {
        console.log('entró al if...')
        console.log('props.recipes  está vacío')
        // getAllRecipes(); // No hace nada?!
        //paginar();
    }
    useEffect(() => {
        console.log('----------useEffect----------')
        console.log('props.recipes: ', props.recipes)
        console.log('props.recipes.length: ', props.recipes.length)
        // props.recipes && props.recipes.length === 0 && dispatch(getAllRecipes())
        // props.recipes && props.recipes.length === 0 && paginar();
        console.log('MainDataHandler.jsx > useEffect > subset: ', subset)
        //paginar(); // entra en Loop infinito
        getAllRecipes(); // No hace nada

    }/* , [props.recipes] */);
    // const fetchPosts = async () => {
    //     const res = await axios.get('http://localhost:3001/recipes')
    //     setPosts(res.data);
    // }
    // fetchPosts();



    return (
        <div className={style.container}>
            MAIN DATA HANDLER
            <br />
            <Pagination recipes={props.recipes} itemsPerPage={ITEMS_PER_PAGE}
                page={page} setPage={actPage} />
            <RecipesGrid recipes={subset} />
            {<Test />}
        </div>
    )



}

function mapStateToProps(state) {
    console.log('MainDataHandler.jsx > mapStateToProps > state: ', state)
    return {
        recipes: state.recipes
    }
}

export default connect(mapStateToProps, null)(Main)