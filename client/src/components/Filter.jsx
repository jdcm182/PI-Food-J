import React from 'react';
import style from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { setFilters/* , restoreRecipes */, displayInfo, displayError, setRecipes, setOrder, clearFilters, setPage } from '../actions';


export default function Filter() {

    //console.log('----------------- function Filter() -----------------')

    const types = useSelector((state) => state.dietTypes);
    const recipes = useSelector((state) => state.recipes);
    //const filteredRecipes = useSelector((state) => state.filteredRecipes);
    const allRecipes = useSelector((state) => state.allRecipes);

    //console.log('types: ', types)

    const dispatch = useDispatch();

    // [{type, count}, {type, count}, {type, count}, {type, count}, {type, count}]
    let typeCount /* = []; typeCount */ = countRecipes(recipes);
    //console.log('typeCount: ', typeCount)

    const order = useSelector((state) => state.order);

    const doOrder = (/* recipes, */ param, o) => {
        try {
            let sortedRecipes = bubbleSort(recipes, param, o);
            dispatch(setRecipes(sortedRecipes));
            dispatch(setOrder(param, o));
        } catch (e) {
            dispatch(displayError(e.message));
        }
    }

    // in: recipes & order
    const ordenar = (recipesArr) => {
        console.log('func ordenar()  >>  order:  ', order)
        let param = '';
        let o = '';
        if (order === 'A-Z') {
            param = 'name';
            o = 'ASC';
        } else if (order === 'Z-A') {
            param = 'name';
            o = 'DESC';
        } else if (order === '1-9') {
            param = 'healthScore';
            o = 'ASC';
        } else {
            param = 'healthScore';
            o = 'DESC'
        }
        console.log('param: ', param)
        console.log('order "o": ', o)
        return bubbleSort(recipesArr, param, o);
    }



    // copiar count de typeCount en types
    /* if (types) { */
    typeCount.forEach((t) => {
        //console.log('types.find  >  types:  ', types)
        const found = types.find((f) => f.type === t)
        if (found) found.count = t.count;
    });
    /* } else {
        console.log('ERROR: TypeError: types.find is not a function')
    } */

    const handleOnClick = (t, types) => {
        /* alert(t.name) */
        try {
            console.log('💥>>>> handleOnClick >>>>💥')
            console.log('types', types)
            console.log('toggleFilter...')
            toggleFilter(types, t.type);
            console.log('types', types)
            console.log('dispatch.. setFilters.. filterByTypes.. getActiveFilters')
            //dispatch(setFilters(filterByType(t.type)));

            const filteredRecipes = filterByTypes(getActiveFilters())
            if (order !== '') {
                let sortedRecipes = ordenar(filteredRecipes);
                //dispatch(setFilters(sortedRecipes));
                dispatch(setRecipes(sortedRecipes));
            } else {
                dispatch(setFilters(filteredRecipes));
            }
            dispatch(setPage(1));

            //console.log('Ordenando desde Filter..')
            //dispatch(setOrder(param, order));
            //order(param, o)

            // VOLVER A CONTAR CANTIDADES
            /* typeCount = countRecipes(filteredRecipes);
            typeCount.forEach((t) => {
                console.log('types.find  >  types:  ', types)
                const found = types.find((f) => f.type === t)
                if (found) found.count = t.count;
            }); */
        } catch (e) {
            toggleFilter(types, t.type);
            //dispatch(displayError(e.message));
            dispatch(displayInfo(e.message));
            console.log(e);
        }
    }

    return (
        <div className={style.filters}>
            FILTER <br />
            { /* NavLink to="/" */}
            {types && types.map((t, i) => (
                <div
                    key={'fil' + i}
                    className={[style.fil, t.filter ? style.selectedF : style.normalF].join(' ')}
                    onClick={() => { handleOnClick(t, types) }}>

                    { }
                    {t.name + ` (${getCount(t.type)})`}
                    < br />
                </div>
            ))}

            <br />

            {/* {typeCount.map((t, i) => (<div key={'t' + i}>{t.type + `(${t.count})`}</div>))} */}

            <div className={style.order}>
                ORDER: {order}
                <br />
                <div>
                    <span className={style.orderTitle}>Recipe Name</span> <br />
                    <button className={order === 'A-Z' ? style.btnActive : style.btnNormal}
                        onClick={/* orderAZ */ () => doOrder('name', 'ASC')}>A-Z</button>
                    <button className={order === 'Z-A' ? style.btnActive : style.btnNormal}
                        onClick={/* orderZA */ () => doOrder('name', 'DESC')}>Z-A</button>
                </div>
                <div>
                    <span className={style.orderTitle}>Recipe Health Score</span><br />
                    <button className={order === '1-9' ? style.btnActive : style.btnNormal}
                        onClick={/* order19 */() => doOrder('healthScore', 'ASC')}>1-9</button>
                    <button className={order === '9-1' ? style.btnActive : style.btnNormal}
                        onClick={/* order91 */() => doOrder('healthScore', 'DESC')}>9-1</button>
                </div>
            </div>

            <br />
            <button className={style.btnNormal} onClick={() => dispatch(clearFilters())}>RESET</button>

        </div >
    )
    //{t.count ? t.name + ` (${t.count})` : t.name} < br />



    function getActiveFilters() {
        const res = [];
        types.forEach(t => {
            if (t.filter === true) res.push(t.type)
        })
        console.log('🕳 getActiveFilters() > res[]: ', res)
        return res;
    }

    function filterByTypes(typesArray) {
        //return recipes.filter(r => r.diets.includes(type))
        let res = [...allRecipes]

        // console.log('filterByTypes(typesArray) > res = recipes : ', res)
        // console.log('typesArray: ', typesArray)

        //dispatch(restoreRecipes());

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
        // const copyArr = [...arr];

        //dispatch(restoreRecipes());


        let itemFound = arr.find(obj => obj.type === type);
        if (itemFound) {
            itemFound.filter = !itemFound.filter;
            // dispatch(setFilters(copyArr))
            // si desactivo filtro, actualizar cards...
        }

    }



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
        //console.log('💢Filter >> countRecipes(arr) >> ')
        let res = [];
        arr.forEach(r => {
            //r.diets && typeCount.push(r.diets[0]);
            //console.log('💤 r: ', r)
            r.diets && r.diets.forEach((d) => {
                const newDiet = addDietType(res, 'type', d);
                newDiet && res.push(newDiet)
            }) // add name
        });
        return res; // ---> typeCount[{type, count}]
    }

    /*function comments() {

        
                // recipes.forEach(r => {
                //     r.diets.forEach((d) => { countDietTypes(types, d) });
                // });
                // console.log('types:  ', types)
            
                // function countDietTypes(arr, diet) {
                //     let found = arr.find(obj => obj.type === diet);
                //     if (found.hasOwnProperty('count')) {
                //         found.count++;
                //     }
                //     else {
                //         found.count = 0;
                //     }
                // }
                


        //console.log('typeCount: ', typeCount)
        //console.log('types: ', types)
        
            // var result = jsObjects.find(obj => {
            //   return obj.b === 6
            // })
        

    }*/


}


// LOGICA DE COMPONENTE ORDER!!!!
//    param:   name || healthScore
//    order:   ASC || DESC
function bubbleSort(arr, param, order) {
    let array = [...arr];
    let cantIterations = 0;
    let cantCambios = 0;
    let huboCambios = true;
    while (huboCambios) {
        huboCambios = false;
        for (let i = 0; i < array.length - 1; i++) {
            cantIterations++;
            let swapCondition = false;
            let actual = array[i][param];
            let next = array[i + 1][param];
            if (typeof actual === "string" && typeof next === "string") {
                actual = actual.toLowerCase();
                next = next.toLowerCase();
            }
            if (order === 'ASC') swapCondition = actual > next;
            else if (order === 'DESC') swapCondition = actual < next;
            //else swapCondition = array[i][param] < array[i + 1][param];
            if (swapCondition) {
                let aux = array[i];
                array[i] = array[i + 1];
                array[i + 1] = aux;
                huboCambios = true;
                cantCambios++;
            }
        }
    }
    console.log('bubbleSort >> CantIterations: ' + cantIterations + ' - cantCambios: ' + cantCambios);
    return array;
} 