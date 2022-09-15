import React, { useState, useEffect } from 'react';
import style from './MainDataHandler.module.css';
import Test from './Test.jsx'
import RecipesGrid from './RecipesGrid.jsx'
import NavBar from './NavBar.jsx'
import { connect, useDispatch } from 'react-redux';
import { Pagination } from './Pagination.jsx';
//import axios from 'axios';

import {
    getAllRecipes1, getAllRecipes, getRecipes2,
    getRecipesPT06, getRecipes3
} from '../actions';
import Filter from './Filter.jsx';
import Cache from './Cache.jsx';

const ITEMS_PER_PAGE = 9;




// Pagination, Sort & Filter
export /* default */ function Main(props) {
    // console.log('------------------------------------------------------------------------')
    // console.log('2️⃣ MainDataHandler.jsx > props: ', props)

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

        // console.log('----------------------funcion paginar----------------------')
        // console.log('MainDataHandler.jsx > paginar() > props.recipes: ', props.recipes)
        // console.log('MainDataHandler.jsx > paginar() > ITEMS_PER_PAGE: ', ITEMS_PER_PAGE)
        // console.log('MainDataHandler.jsx > paginar() > page: ', page)
        // console.log('MainDataHandler.jsx > paginar() > subset: ', subset)

        // let resp = await axios.get(`http://localhost:3001/recipes`)
        // console.log('Test.jsx > handleDispatch() > resp: ', resp)
        // dispatch({ type: 'GET_ALL_RECIPES', payload: resp.data })
        // setSubset(resp.data)
        //


        if (props.recipes !== undefined && props.recipes.length > 0) {

            console.log('seteando subset...')
            const sub = props.recipes.slice(
                (page - 1) * ITEMS_PER_PAGE,
                (page * ITEMS_PER_PAGE) /* - 1 */
            )
            setSubset(sub);
            // console.log('sub: ', sub);
            // //setSubset(props.recipes) // <-- ¿React No llega a enterarse del cambio!?
            // //setSubset( prev=> (...prev, props.recipes))
            // console.log('estado local actualizado con props.recipes 🎈 subset')
        } else { console.log('No entró al if de:\n 🎈if (props.recipes !== undefined && props.recipes.length > 0)') }

        // props.recipes && setSubset(props.recipes.slice(
        //     (page - 1) * ITEMS_PER_PAGE,
        //     (page * ITEMS_PER_PAGE) /* - 1 */
        // ));
        // console.log('MainDataHandler.jsx > Paginar() > subset: ', subset)

    }

    function setSubset2() {
        setSubset(props.recipes);
        //console.log('MainDataHandler.jsx > subset: ', subset)
    }

    //const dispatch = useDispatch();


    useEffect(() => {
        // console.log('MainDataHandler.jsx ----------useEffect----------')
        // console.log('props.recipes: ', props.recipes)
        // console.log('props.recipes.length: ', props.recipes.length)
        // // props.recipes && props.recipes.length === 0 && dispatch(getAllRecipes())
        // // props.recipes && props.recipes.length === 0 && paginar();
        // console.log('MainDataHandler.jsx > useEffect > subset: ', subset)
        // //paginar(); // entra en Loop infinito
        // //getAllRecipes(); // No hace nada >> PORQUE HAY QUE dispatchEARLO!!

        //!props.recipes && dispatch(getAllRecipes()); //<-- No anda.. funcion si:


        //dispatch(getAllRecipes())
        //paginar();
        //props.getRecipesToProps();
        // /* props.recipes && */ paginar();


        // ESTE BLOQUE ES EL QUE ESTA FUNCIONANDO OK..
        if (props.recipes !== undefined && props.recipes.length === 0) {
            // console.log('entró al if ⛔ [props.recipes] está vacío.. dispatch!')
            // getAllRecipes(); // No hace nada?!
            dispatch(getAllRecipes())
        }


        //dispatch(props.getCache())


        if (props.recipes && props.recipes.length > 0) {
            paginar();
        }

    }, [props.recipes, page]);



    // const fetchPosts = async () => {
    //     const res = await axios.get('http://localhost:3001/recipes')
    //     setPosts(res.data);
    // }
    // fetchPosts();



    return (
        <div className={style.container}>
            <NavBar setPage={actPage} />

            <div className={style.main}>
                <Filter />

                <div className={style.central}>
                    {!props.recipes && "MAIN DATA HANDLER"}
                    <br />
                    {props.recipes && <Pagination recipes={props.recipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}
                    {subset && <RecipesGrid recipes={subset} />}
                    {props.recipes && <Pagination recipes={props.recipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}
                    {<Test setSubset2={setSubset2} />}
                </div>

                <Cache />

            </div>

        </div>
    )



}

function mapStateToProps(state) {
    console.log('1️⃣ MainDataHandler.jsx > mapStateToProps > state: ', state)
    return {
        recipes: state.recipes,
        cache: state.cache
    }
}
/* 
function mapDispatchToProps(dispatch) {
    return {
        getRecipesToProps: () => dispatch(getAllRecipes)
        // getRecipesToProps: dispatch(getRecipesPT06)
        // getRecipesToProps: dispatch(getRecipes3)
        //getRecipesToProps: dispatch(getAllRecipes1)
    }
    //  getAllRecipes1, getAllRecipes, getRecipes2,
    //  getRecipesPT06, getRecipes3
}
 */
export default connect(mapStateToProps, null/* mapDispatchToProps */)(Main)