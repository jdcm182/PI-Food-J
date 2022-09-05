import React, { useEffect } from 'react';
import style from './MainDataHandler.module.css';
//import Test from './Test.jsx'
import RecipesGrid from './RecipesGrid.jsx'
import { connect, useDispatch } from 'react-redux';

import { getAllRecipes } from '../actions';

//const ITEMS_PER_PAGE = 9;

// Pagination, Sort & Filter
export function Main(props) {
    console.log('Main.jsx > props: ', props)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRecipes())
    }, []);

    return (
        <div className={style.container}>
            MAIN DATA HANDLER
            <br />
            <RecipesGrid recipes={props.recipes} />
            {/* <Test /> */}
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