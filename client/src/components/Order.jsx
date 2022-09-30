import React from 'react';
import style from './Order.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setRecipes, setOrder } from '../actions';

export default function Order() {
    //console.log('----------------- function Order() -----------------')


    const recipes = useSelector((state) => state.recipes);
    const ord = useSelector((state) => state.order);
    const dispatch = useDispatch();



    /*     const orderAZ = () => {
            let sortedRecipes = bubbleSort(recipes, 'name', 'ASC');
            dispatch(setRecipes(sortedRecipes));
        }
    
        const orderZA = () => {
            let sortedRecipes = bubbleSort(recipes, 'name', 'DESC');
            dispatch(setRecipes(sortedRecipes));
        }
    
        const order19 = () => {
            let sortedRecipes = bubbleSort(recipes, 'healthScore', 'ASC');
            dispatch(setRecipes(sortedRecipes));
        }
    
        const order91 = () => {
            let sortedRecipes = bubbleSort(recipes, 'healthScore', 'DESC');
            dispatch(setRecipes(sortedRecipes));
        } */

    const order = (/* recipes, */ param, order) => {
        let sortedRecipes = bubbleSort(recipes, param, order);
        dispatch(setRecipes(sortedRecipes));
        dispatch(setOrder(param, order));
    }

    return (
        <div className={style.order}>
            ORDER
            <br />
            <div>
                Recipe Name <br />
                <button className={ord === 'A-Z' ? style.btnActive : style.btnNormal}
                    onClick={/* orderAZ */ () => order('name', 'ASC')}>A-Z</button>
                <button className={ord === 'Z-A' ? style.btnActive : style.btnNormal}
                    onClick={/* orderZA */ () => order('name', 'DESC')}>Z-A</button>
            </div>
            <div>
                Recipe Health Score<br />
                <button className={ord === '1-9' ? style.btnActive : style.btnNormal}
                    onClick={/* order19 */() => order('healthScore', 'ASC')}>1-9</button>
                <button className={ord === '9-1' ? style.btnActive : style.btnNormal}
                    onClick={/* order91 */() => order('healthScore', 'DESC')}>9-1</button>
            </div>
        </div>

    )

}

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
            if (order === 'ASC') swapCondition = array[i][param] > array[i + 1][param];
            else swapCondition = array[i][param] < array[i + 1][param];
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