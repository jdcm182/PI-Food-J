import React from 'react';
import style from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { setFilter } from '../actions';


export default function Filter() {

    const types = useSelector((state) => state.dietTypes);
    const recipes = useSelector((state) => state.recipes);

    const dispatch = useDispatch();

    let tipos = []; // [{type, count}, {type, count}, {type, count}, {type, count}, {type, count}]
    function addDietType(arr, key, diet) {
        let found = arr.find(obj => obj[key] === diet);
        //found ? found.count++ : found = { key: diet, count: 0 }   // <-- key es variable!! como la uso con esta sintaxis?
        if (found) found.count++
        else {
            found = {};
            found[key] = diet;
            found.count = 0;
            arr.push(found);
        }

        // let found = tipos.find(obj => obj['type'] === diet);
        // found ? found.count++ : found = { type: diet, count: 0 }
        // console.log('found: ', found)
        // tipos.push(found);
    }

    recipes.forEach(r => {
        //r.diets && tipos.push(r.diets[0]);
        r.diets.forEach((d) => { addDietType(tipos, 'type', d) })
    });

    /*
        var result = jsObjects.find(obj => {
          return obj.b === 6
        })
    */


    return (
        <div className={style.filters}>
            FILTER <br />
            { /* NavLink to="/" */}
            {types && types.map((t, i) => (
                <div
                    key={'fil' + i}
                    className={style.fil}
                    onClick={() => { /* alert(t.name) */
                        dispatch(setFilter(filterByType(t.type)));
                    }}>

                    {t.name} < br />
                </div>
            ))}

            <br />

            {tipos.map((t, i) => (<div key={'t' + i}>{t.type + `(${t.count})`}</div>))}

        </div >

    )

    function filterByType(type) {
        return recipes.filter(r => r.diets.includes(type))
    }

}