import React, { useState, useEffect } from 'react';
import style from './MainDataHandler.module.css';
//import Test from './Test.jsx'
import RecipesGrid from './RecipesGrid.jsx'
import NavBar from './NavBar.jsx'
import Order from './Order.jsx'
import { connect, useDispatch } from 'react-redux';
import { Pagination } from './Pagination.jsx';
//import axios from 'axios';

import {
    getAllRecipes/* , getAllRecipes1, getRecipes2,
    getRecipesPT06, getRecipes3 */
} from '../actions';
import Filter from './Filter.jsx';
import Cache from './Cache.jsx';

const ITEMS_PER_PAGE = 9;

//let selectedRecipes;


// Pagination, Sort & Filter
export /* default */ function Main({ recipes, filteredRecipes, cache }) {
    // console.log('------------------------------------------------------------------------')
    // console.log('2️⃣ MainDataHandler.jsx > props: ', props)

    const [page, setPage] = useState(1);
    const [subset, setSubset] = useState([]);

    const dispatch = useDispatch();

    //const [posts, setPosts] = useState([]);

    function actPage(p) { setPage(p); }

    /*  LOGICA DE PAGINACION*/
    async function paginar() {

        // console.log('----------------------funcion paginar----------------------')


        if (recipes !== undefined && recipes.length > 0) {

            //console.log('seteando subset...')
            const sub = recipes.slice(
                (page - 1) * ITEMS_PER_PAGE,
                (page * ITEMS_PER_PAGE) /* - 1 */
            )
            setSubset(sub);

        } else { console.log('No entró al if de:\n if (recipes !== undefined && recipes.length > 0)') }

    }


    useEffect(() => {


        //selectedRecipes = props.recipes;
        /* if (props.filteredRecipes && props.filteredRecipes.length > 0) {
            selectedRecipes = props.filteredRecipes;
        } */

        if (recipes !== undefined && recipes.length === 0) {
            dispatch(getAllRecipes())
        }


        if (recipes && recipes.length > 0) {
            paginar();
        }

    }, [recipes, page]);








    return (
        <div className={style.container}>
            <NavBar setPage={actPage} />

            <div className={style.main}>
                <div className={style.column}>
                    <Filter />
                    <Order />
                </div>

                <div className={style.central}>
                    {!recipes && "MAIN DATA HANDLER"}
                    <br />
                    {recipes && <Pagination recipes={recipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}
                    {subset && <RecipesGrid recipes={subset} />}
                    {recipes && <Pagination recipes={recipes} itemsPerPage={ITEMS_PER_PAGE}
                        page={page} setPage={actPage} />}

                </div>

                <div className={style.column}>
                    <Cache />
                </div>

            </div>

        </div>
    )



}

function mapStateToProps(state) {
    //console.log('1️⃣ MainDataHandler.jsx > mapStateToProps > state: ', state)
    return {
        recipes: state.recipes,
        //filteredRecipes: state.filteredRecipes,
        //cache: state.cache
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