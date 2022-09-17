import React from 'react';
import style from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { setFilters, restoreRecipes } from '../actions';


export default function Filter() {

    console.log('----------------- function Filter() -----------------')

    const types = useSelector((state) => state.dietTypes);
    const recipes = useSelector((state) => state.recipes);
    //const filteredRecipes = useSelector((state) => state.filteredRecipes);

    const dispatch = useDispatch();

    // [{type, count}, {type, count}, {type, count}, {type, count}, {type, count}]
    let typeCount /* = []; typeCount */ = countRecipes(recipes);
    console.log('typeCount: ', typeCount)


    // copiar count de typeCount en types
    /* if (types) { */
    typeCount.forEach((t) => {
        console.log('types.find  >  types:  ', types)
        const found = types.find((f) => f.type === t)
        if (found) found.count = t.count;
    });
    /* } else {
        console.log('ERROR: TypeError: types.find is not a function')
    } */

    return (
        <div className={style.filters}>
            FILTER <br />
            { /* NavLink to="/" */}
            {types && types.map((t, i) => (
                <div
                    key={'fil' + i}
                    className={[style.fil, t.filter ? style.selectedF : style.normalF].join(' ')}
                    onClick={() => { /* alert(t.name) */
                        try {
                            toggleFilter(types, t.type);
                            //dispatch(setFilters(filterByType(t.type)));
                            dispatch(setFilters(filterByTypes(getActiveFilters())));
                            // VOLVER A CONTAR CANTIDADES
                            /* typeCount = countRecipes(filteredRecipes);
                            typeCount.forEach((t) => {
                                console.log('types.find  >  types:  ', types)
                                const found = types.find((f) => f.type === t)
                                if (found) found.count = t.count;
                            }); */
                        } catch (e) {
                            toggleFilter(types, t.type);
                            console.log(e);
                        }
                    }}>

                    { }
                    {t.name + ` (${getCount(t.type)})`}
                    < br />
                </div>
            ))}

            <br />

            {/* {typeCount.map((t, i) => (<div key={'t' + i}>{t.type + `(${t.count})`}</div>))} */}

        </div >
    )
    //{t.count ? t.name + ` (${t.count})` : t.name} < br />

    function getCount(type) {
        let res = 0;
        const found = typeCount.find(tc => tc.type === type)
        if (found) res = found.count;
        return res;
    }

    function addDietType(arr, key, diet) { // arr <-- typeCount array
        let found = arr.find(obj => obj[key] === diet);
        //found ? found.count++ : found = { key: diet, count: 0 }   // <-- key es variable!! como la uso con esta sintaxis?
        if (found) found.count++
        else {
            const newItem = {};
            newItem[key] = diet;
            newItem.count = 1;
            //arr.push(newItem);
            return newItem;
        } // agregar name

        /* // let found = typeCount.find(obj => obj['type'] === diet);
        // found ? found.count++ : found = { type: diet, count: 0 }
        // console.log('found: ', found)
        // typeCount.push(found); */
    }

    function countRecipes(arr) { //  arr <-- recipes array
        let res = [];
        arr.forEach(r => {
            //r.diets && typeCount.push(r.diets[0]);
            r.diets.forEach((d) => {
                const newDiet = addDietType(res, 'type', d);
                newDiet && res.push(newDiet)
            }) // add name
        });
        return res; // ---> typeCount[{type, count}]
    }

    function comments() {

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


        //console.log('typeCount: ', typeCount)
        //console.log('types: ', types)
        /*
            var result = jsObjects.find(obj => {
              return obj.b === 6
            })
        */

    }



    function getActiveFilters() {
        const res = [];
        types.forEach(t => {
            if (t.filter === true) res.push(t.type)
        })
        console.log('getActiveFilters() > res[]: ', res)
        return res;
    }

    function filterByTypes(typesArray) {
        //return recipes.filter(r => r.diets.includes(type))
        let res = recipes;
        // console.log('filterByTypes(typesArray) > res = recipes : ', res)
        // console.log('typesArray: ', typesArray)
        dispatch(restoreRecipes());
        typesArray.forEach(type => {
            const aux = res.filter(r => r.diets.includes(type));
            if (aux && aux.length > 0) res = aux;
            else { throw new Error('Filter doesn`t match any recipe') }
            //console.log('filterByTypes(typesArray) > res = res.filter... : ', res)
        });

        return res;
    }

    /* function filterByType(type) {
        return recipes.filter(r => r.diets.includes(type))
    } */


    function toggleFilter(arr, type) {
        let itemFound = arr.find(obj => obj.type === type);
        if (itemFound) itemFound.filter = !itemFound.filter;
    }

}
