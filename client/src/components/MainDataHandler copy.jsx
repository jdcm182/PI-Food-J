import React, { useState, useEffect } from 'react';
import style from './MainDataHandler.module.css';
import Test from './Test.jsx'
import RecipesGrid from './RecipesGrid.jsx'
import NavBar from './NavBar.jsx'
import Order from './Order.jsx'
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

let selectedRecipes;


// Pagination, Sort & Filter
export /* default */ function Main(props) {
    // console.log('------------------------------------------------------------------------')
    // console.log('2️⃣ MainDataHandler.jsx > props: ', props)

    const [page, setPage] = useState(1);
    const [subset, setSubset] = useState([]);

    const dispatch = useDispatch();

    //const [posts, setPosts] = useState([]);

    function actPage(p) { setPage(p); }

    /*  LOGICA DE PAGINACION*/
    //let subset = [];
    //subset = props.recipes.slice(
    async function paginar() {

        /*//console.log('----------------------funcion paginar----------------------')
        // console.log('MainDataHandler.jsx > paginar() > props.recipes: ', props.recipes)
        // console.log('MainDataHandler.jsx > paginar() > ITEMS_PER_PAGE: ', ITEMS_PER_PAGE)
        // console.log('MainDataHandler.jsx > paginar() > page: ', page)
        // console.log('MainDataHandler.jsx > paginar() > subset: ', subset)

        // let resp = await axios.get(`http://localhost:3001/recipes`)
        // console.log('Test.jsx > handleDispatch() > resp: ', resp)
        // dispatch({ type: 'GET_ALL_RECIPES', payload: resp.data })
        // setSubset(resp.data)
        // */





        if (selectedRecipes !== undefined && selectedRecipes.length > 0) {

            //console.log('seteando subset...')
            const sub = selectedRecipes.slice(
                (page - 1) * ITEMS_PER_PAGE,
                (page * ITEMS_PER_PAGE) /* - 1 */
            )
            setSubset(sub);
            /* // console.log('sub: ', sub);
            // //setSubset(selectedRecipes) // <-- ¿React No llega a enterarse del cambio!?
            // //setSubset( prev=> (...prev, selectedRecipes))
            // console.log('estado local actualizado con selectedRecipes 🎈 subset') */
        } else { console.log('No entró al if de:\n if (selectedRecipes !== undefined && selectedRecipes.length > 0)') }

        /* // selectedRecipes && setSubset(selectedRecipes.slice(
        //     (page - 1) * ITEMS_PER_PAGE,
        //     (page * ITEMS_PER_PAGE) //- 1 
        // ));
        // console.log('MainDataHandler.jsx > Paginar() > subset: ', subset) */

    }

    function setSubset2() {
        setSubset(selectedRecipes); //console.log('MainDataHandler.jsx > subset: ', subset)
    }

    //const dispatch = useDispatch();


    useEffect(() => {


        selectedRecipes = props.recipes;
        if (props.filteredRecipes && props.filteredRecipes.length > 0) {
            selectedRecipes = props.filteredRecipes;
        }

        /*         // console.log('MainDataHandler.jsx ----------useEffect----------')
                // console.log('selectedRecipes: ', selectedRecipes)
                // console.log('selectedRecipes.length: ', selectedRecipes.length)
                // // selectedRecipes && selectedRecipes.length === 0 && dispatch(getAllRecipes())
                // // selectedRecipes && selectedRecipes.length === 0 && paginar();
                // console.log('MainDataHandler.jsx > useEffect > subset: ', subset)
                // //paginar(); // entra en Loop infinito
                // //getAllRecipes(); // No hace nada >> PORQUE HAY QUE dispatchEARLO!!
        
                //!selectedRecipes && dispatch(getAllRecipes()); //<-- No anda.. funcion si:
        
        
                //dispatch(getAllRecipes())
                //paginar();
                //props.getRecipesToProps();
                // /* selectedRecipes && */ //paginar(); 


        // ESTE BLOQUE ES EL QUE ESTA FUNCIONANDO OK..
        if (selectedRecipes !== undefined && selectedRecipes.length === 0) {
            // console.log('entró al if ⛔ [selectedRecipes] está vacío.. dispatch!')
            // getAllRecipes(); // No hace nada?!
            dispatch(getAllRecipes())
        }


        //dispatch(props.getCache())


        if (selectedRecipes && selectedRecipes.length > 0) {
            paginar();
        }

    }, [props.recipes, props.filteredRecipes, page]);



    // const fetchPosts = async () => {
    //     const res = await axios.get('http://localhost:3001/recipes')
    //     setPosts(res.data);
    // }
    // fetchPosts();



    return (
        <div className={style.container}>
            <NavBar setPage={actPage} />

            <div className={style.main}>
                <div className={style.column}>
                    <Filter />
                    <Order />
                </div>

                <div className={style.central}>
                    {!selectedRecipes && "MAIN DATA HANDLER"}
                    <br />
                    {selectedRecipes && <Pagination recipes={selectedRecipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}
                    {subset && <RecipesGrid recipes={subset} />}
                    {selectedRecipes && <Pagination recipes={selectedRecipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}
                    {<Test setSubset2={setSubset2} />}
                </div>

                <Cache />

            </div>

        </div>
    )



}

function mapStateToProps(state) {
    //console.log('1️⃣ MainDataHandler.jsx > mapStateToProps > state: ', state)
    return {
        recipes: state.recipes,
        filteredRecipes: state.filteredRecipes,
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