import React from 'react';
import style from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { setFilters } from '../actions';


export default function Filter() {

    const types = useSelector((state) => state.dietTypes);
    const recipes = useSelector((state) => state.recipes);

    const dispatch = useDispatch();

    /*
    recipes.forEach(r => {
        r.diets.forEach((d) => { countDietTypes(types, d) });
    });
    console.log('types:  ', types)

    function countDietTypes(arr, diet) {
        let found = arr.find(obj => obj.type === diet);
        if (found.hasOwnProperty('count')) {
            found.count++;
        }
        else {
            found.count = 0;
        }
    }
    */

    let typeCount = []; // [{type, count}, {type, count}, {type, count}, {type, count}, {type, count}]
    function addDietType(arr, key, diet) {
        let found = arr.find(obj => obj[key] === diet);
        //found ? found.count++ : found = { key: diet, count: 0 }   // <-- key es variable!! como la uso con esta sintaxis?
        if (found) found.count++
        else {
            found = {};
            found[key] = diet;
            found.count = 1;
            arr.push(found);
        } // agregar name

        // let found = typeCount.find(obj => obj['type'] === diet);
        // found ? found.count++ : found = { type: diet, count: 0 }
        // console.log('found: ', found)
        // typeCount.push(found);
    }

    //function countRecipes(arr,)

    recipes.forEach(r => {
        //r.diets && typeCount.push(r.diets[0]);
        r.diets.forEach((d) => { addDietType(typeCount, 'type', d) }) // add name
    });

    typeCount.forEach((t) => {
        const found = types.find((f) => f.type === t)
        if (found) found.count = t.count;
    })

    console.log('typeCount: ', typeCount)
    console.log('types: ', types)
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
                    className={[style.fil, t.filter ? style.selectedF : style.normalF].join(' ')}
                    onClick={() => { /* alert(t.name) */
                        toggleFilter(types, t.type);
                        //dispatch(setFilters(filterByType(t.type)));
                        dispatch(setFilters(filterByTypes(getActiveFilters())));
                    }}>

                    { }
                    {t.name + ` (${getCount(t.type)})`}
                    < br />
                </div>
            ))}

            <br />

            {typeCount.map((t, i) => (<div key={'t' + i}>{t.type + `(${t.count})`}</div>))}

        </div >
    )
    //{t.count ? t.name + ` (${t.count})` : t.name} < br />

    function getCount(type) {
        let res = 0;
        const found = typeCount.find(tc => tc.type === type)
        if (found) res = found.count;
        return res;
    }

    function getActiveFilters() {
        const res = [];
        types.forEach(t => {
            if (t.filter === true) res.push(t.type)
        })
        return res;
    }

    function filterByTypes(typesArray) {
        //return recipes.filter(r => r.diets.includes(type))
        let res = recipes;

        typesArray.forEach(type => {
            res = res.filter(r => r.diets.includes(type))
        });

        return res;
    }

    function filterByType(type) {
        return recipes.filter(r => r.diets.includes(type))
    }


    function toggleFilter(arr, type) {
        let itemFound = arr.find(obj => obj.type === type);
        if (itemFound) itemFound.filter = !itemFound.filter;
    }

}
